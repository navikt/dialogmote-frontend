import { defineEvent } from "@navikt/esyfo-logger";
import { prettifyError, type ZodError } from "zod";
import {
  FetchNetworkError,
  FetchResponseParseError,
} from "@/common/api/fetch/errors";
import { HttpError } from "@/common/utils/errors/HttpError";
import { transportFailureDiagnostics } from "@/common/utils/failureDiagnostics";
import {
  type TokenXTargetApi,
  tokenXTargetApiToUpstream,
} from "@/server/auth/tokenXExchange";
import { appLog } from "./logger";

export const RuntimeOperation = {
  LUMI_FEEDBACK_SUBMIT: "lumi_feedback_submit",
  BREV_LIST_FETCH: "brev_list_fetch",
  BREV_PDF_FETCH: "brev_pdf_fetch",
  BREV_MARK_READ: "brev_mark_read",
  BREV_RESPONSE_SUBMIT: "brev_response_submit",
  MOTEBEHOV_SUBMIT: "motebehov_submit",
  MOTEBEHOV_COMPLETE: "motebehov_complete",
  MOTEBEHOV_FETCH: "motebehov_fetch",
  SYKMELDT_FETCH: "sykmeldt_fetch",
} as const;

export type RuntimeOperation =
  (typeof RuntimeOperation)[keyof typeof RuntimeOperation];

const requestFailureMessage: Record<RuntimeOperation, string> = {
  lumi_feedback_submit: "Kunne ikke sende tilbakemelding til Lumi",
  brev_list_fetch: "Kunne ikke hente dialogmøtebrev",
  brev_pdf_fetch: "Kunne ikke hente PDF for dialogmøtebrev",
  brev_mark_read: "Kunne ikke markere dialogmøtebrev som lest",
  brev_response_submit: "Kunne ikke sende svar på dialogmøtebrev",
  motebehov_submit: "Kunne ikke sende møtebehov",
  motebehov_complete: "Kunne ikke fullføre møtebehov",
  motebehov_fetch: "Kunne ikke hente møtebehov",
  sykmeldt_fetch:
    "Kunne ikke hente sykmeldt for den innloggede lederens relasjon",
};

const RuntimeErrorCode = {
  UPSTREAM_HTTP_ERROR: "UPSTREAM_HTTP_ERROR",
  UPSTREAM_NETWORK_ERROR: "UPSTREAM_NETWORK_ERROR",
  UPSTREAM_RESPONSE_PARSE_ERROR: "UPSTREAM_RESPONSE_PARSE_ERROR",
  UPSTREAM_RESPONSE_SCHEMA_MISMATCH: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
  UPSTREAM_REQUEST_ERROR: "UPSTREAM_REQUEST_ERROR",
} as const;

type RequestFailure = {
  operation: RuntimeOperation;
  targetApi: TokenXTargetApi;
  method: "GET" | "POST";
  error: unknown;
};

type RequestDiagnostics = {
  error_code: string;
  failure_kind?: string;
  failure_stage: string;
  cause_type?: string;
  upstreamStatus?: number;
};

const classifyRequestFailure = (
  error: unknown,
  operation: RuntimeOperation,
  targetApi: TokenXTargetApi,
): RequestDiagnostics => {
  if (error instanceof HttpError) {
    const status = error.code;
    const relationNotFound =
      status === 404 &&
      error.upstreamErrorCode === "SYKMELDT_NOT_FOUND" &&
      operation === RuntimeOperation.SYKMELDT_FETCH &&
      tokenXTargetApiToUpstream(targetApi) === "dinesykmeldte-backend";
    return {
      error_code: relationNotFound
        ? "SYKMELDT_NOT_FOUND"
        : RuntimeErrorCode.UPSTREAM_HTTP_ERROR,
      failure_kind: relationNotFound ? "domain" : "http",
      failure_stage: "response" as const,
      ...(Number.isInteger(status) && status >= 100 && status <= 599
        ? { upstreamStatus: status }
        : {}),
    };
  }
  if (error instanceof FetchNetworkError) {
    return {
      error_code: RuntimeErrorCode.UPSTREAM_NETWORK_ERROR,
      ...transportFailureDiagnostics(error),
      failure_stage: "request" as const,
    };
  }
  if (error instanceof FetchResponseParseError) {
    return {
      error_code:
        error.failureReason === "body_read"
          ? "UPSTREAM_RESPONSE_BODY_READ_FAILED"
          : RuntimeErrorCode.UPSTREAM_RESPONSE_PARSE_ERROR,
      failure_kind: "invalid_response" as const,
      failure_stage: "response_parse" as const,
      cause_type: "FetchResponseParseError",
    };
  }
  return {
    error_code: RuntimeErrorCode.UPSTREAM_REQUEST_ERROR,
    ...transportFailureDiagnostics(error),
    failure_stage: "request" as const,
  };
};

type RequestLogContext = {
  error_code: string;
  upstream: string;
  method: "GET" | "POST";
  upstream_status?: number;
  failure_kind?: string;
  failure_stage?: string;
  cause_type?: string;
  validation_error?: string;
};
const requestEvent = (operation: RuntimeOperation) =>
  defineEvent<RequestLogContext>({
    name: `dialogmote_${operation}_failed`,
    operation,
    level: "error",
    message: requestFailureMessage[operation],
  });
const relationNotFoundEvent = defineEvent<RequestLogContext>({
  name: "dialogmote_sykmeldt_fetch_failed",
  operation: RuntimeOperation.SYKMELDT_FETCH,
  level: "error",
  message: "Ingen sykmeldt funnet for den innloggede lederens relasjon",
});

const logRuntimeError = ({
  operation,
  targetApi,
  method,
  errorCode,
  upstreamStatus,
  validationError,
  diagnostics,
}: Omit<RequestFailure, "error"> & {
  errorCode: string;
  upstreamStatus?: number;
  validationError?: ZodError;
  diagnostics?: {
    failure_kind?: string;
    failure_stage: string;
    cause_type?: string;
  };
}): void => {
  appLog.event(
    errorCode === "SYKMELDT_NOT_FOUND"
      ? relationNotFoundEvent
      : requestEvent(operation),
    {
      error_code: errorCode,
      upstream: tokenXTargetApiToUpstream(targetApi),
      method,
      ...diagnostics,
      ...(upstreamStatus === undefined
        ? {}
        : { upstream_status: upstreamStatus }),
      ...(validationError === undefined
        ? {}
        : { validation_error: prettifyError(validationError) }),
    },
  );
};

export const logUpstreamRequestFailure = ({
  error,
  ...context
}: RequestFailure): void => {
  const { error_code, upstreamStatus, ...diagnostics } = classifyRequestFailure(
    error,
    context.operation,
    context.targetApi,
  );
  logRuntimeError({
    ...context,
    errorCode: error_code,
    diagnostics,
    ...(upstreamStatus === undefined ? {} : { upstreamStatus }),
  });
};

export const logResponseSchemaFailure = ({
  operation,
  targetApi,
  validationError,
}: Omit<RequestFailure, "error" | "method"> & {
  validationError: ZodError;
}): void => {
  logRuntimeError({
    operation,
    targetApi,
    method: "GET",
    errorCode: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
    validationError,
    diagnostics: {
      failure_kind: "invalid_response",
      failure_stage: "response_validation",
    },
  });
};
