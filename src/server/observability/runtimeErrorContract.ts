import { logger } from "@navikt/next-logger";
import {
  FetchNetworkError,
  FetchResponseParseError,
} from "@/common/api/fetch/errors";
import { HttpError } from "@/common/utils/errors/HttpError";
import {
  type TokenXTargetApi,
  tokenXTargetApiToUpstream,
} from "@/server/auth/tokenXExchange";

export const RuntimeOperation = {
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

const RuntimeErrorCode = {
  UPSTREAM_HTTP_ERROR: "UPSTREAM_HTTP_ERROR",
  UPSTREAM_NETWORK_ERROR: "UPSTREAM_NETWORK_ERROR",
  UPSTREAM_RESPONSE_PARSE_ERROR: "UPSTREAM_RESPONSE_PARSE_ERROR",
  UPSTREAM_RESPONSE_SCHEMA_MISMATCH: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
  UPSTREAM_REQUEST_ERROR: "UPSTREAM_REQUEST_ERROR",
} as const;

type RuntimeErrorCode =
  (typeof RuntimeErrorCode)[keyof typeof RuntimeErrorCode];

type RequestFailure = {
  operation: RuntimeOperation;
  targetApi: TokenXTargetApi;
  method: "GET" | "POST";
  error: unknown;
};

const classifyRequestFailure = (
  error: unknown,
): { error_code: RuntimeErrorCode; upstreamStatus?: number } => {
  if (error instanceof HttpError) {
    const status = error.code;
    return {
      error_code: RuntimeErrorCode.UPSTREAM_HTTP_ERROR,
      ...(Number.isInteger(status) && status >= 100 && status <= 599
        ? { upstreamStatus: status }
        : {}),
    };
  }
  if (error instanceof FetchNetworkError) {
    return { error_code: RuntimeErrorCode.UPSTREAM_NETWORK_ERROR };
  }
  if (error instanceof FetchResponseParseError) {
    return { error_code: RuntimeErrorCode.UPSTREAM_RESPONSE_PARSE_ERROR };
  }
  return { error_code: RuntimeErrorCode.UPSTREAM_REQUEST_ERROR };
};

const logRuntimeError = ({
  operation,
  targetApi,
  method,
  errorCode,
  upstreamStatus,
}: Omit<RequestFailure, "error"> & {
  errorCode: RuntimeErrorCode;
  upstreamStatus?: number;
}): void => {
  logger.error(
    {
      event_type: `dialogmote_${operation}_failed`,
      operation,
      error_code: errorCode,
      upstream: tokenXTargetApiToUpstream(targetApi),
      method,
      ...(upstreamStatus === undefined
        ? {}
        : { upstream_status: upstreamStatus }),
    },
    "Upstream request failed",
  );
};

export const logUpstreamRequestFailure = ({
  error,
  ...context
}: RequestFailure): void => {
  const { error_code, upstreamStatus } = classifyRequestFailure(error);
  logRuntimeError({
    ...context,
    errorCode: error_code,
    ...(upstreamStatus === undefined ? {} : { upstreamStatus }),
  });
};

export const logResponseSchemaFailure = ({
  operation,
  targetApi,
  errorCode,
}: Omit<RequestFailure, "error" | "method"> & {
  errorCode: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH";
}): void => {
  logRuntimeError({
    operation,
    targetApi,
    method: "GET",
    errorCode,
  });
};
