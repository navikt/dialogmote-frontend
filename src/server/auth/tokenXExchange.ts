import { defineEvent } from "@navikt/esyfo-logger";
import { requestTokenxOboToken } from "@navikt/oasis";
import { transportFailureDiagnostics } from "@/common/utils/failureDiagnostics";
import { LoggedUpstreamError } from "@/server/observability/LoggedUpstreamError";
import { appLog } from "@/server/observability/logger";
import serverEnv from "@/server/utils/serverEnv";

export enum TokenXTargetApi {
  LUMI_API = "LUMI_API",
  SYFOMOTEBEHOV = "SYFOMOTEBEHOV",
  ISDIALOGMOTE = "ISDIALOGMOTE",
  DINESYKMELDTE_BACKEND = "DINESYKMELDTE_BACKEND",
}

export async function exchangeIdPortenTokenForTokenXOboToken(
  idPortenToken: string,
  targetApi: TokenXTargetApi,
): Promise<string> {
  const clientId = getClientIdForTokenXTargetApi(targetApi);
  let tokenXGrant: Awaited<ReturnType<typeof requestTokenxOboToken>>;
  try {
    tokenXGrant = await requestTokenxOboToken(idPortenToken, clientId);
  } catch (error) {
    throwTokenXExchangeError(targetApi, error);
  }

  if (!tokenXGrant.ok) {
    // Oasis does not distinguish rejected grants from provider/network failures.
    // The ID-porten token was already validated before requesting this exchange.
    throwTokenXExchangeError(targetApi, tokenXGrant.error);
  }

  return tokenXGrant.token;
}

const tokenExchangeFailed = defineEvent<{
  failure_kind: string;
  error_code: string;
  cause_type?: string;
  failure_stage: "token_exchange";
  dependency: "tokenx";
  upstream: string;
}>({
  name: "tokenx_obo_exchange_failed",
  operation: "exchange_tokenx_obo",
  level: "error",
  message: "TokenX OBO exchange failed",
});

function throwTokenXExchangeError(
  targetApi: TokenXTargetApi,
  cause: unknown,
): never {
  const diagnostics = transportFailureDiagnostics(cause);
  appLog.event(tokenExchangeFailed, {
    error_code: "TOKENX_OBO_EXCHANGE_ERROR",
    ...diagnostics,
    failure_kind: "token",
    failure_stage: "token_exchange",
    dependency: "tokenx",
    upstream: tokenXTargetApiToUpstream(targetApi),
  });
  throw new LoggedUpstreamError(500, "TokenX OBO exchange failed");
}

export function tokenXTargetApiToUpstream(
  targetApi: TokenXTargetApi,
): "syfomotebehov" | "isdialogmote" | "dinesykmeldte-backend" | "lumi-api" {
  switch (targetApi) {
    case TokenXTargetApi.LUMI_API:
      return "lumi-api";
    case TokenXTargetApi.SYFOMOTEBEHOV:
      return "syfomotebehov";
    case TokenXTargetApi.ISDIALOGMOTE:
      return "isdialogmote";
    case TokenXTargetApi.DINESYKMELDTE_BACKEND:
      return "dinesykmeldte-backend";
    default:
      return assertUnreachable(targetApi);
  }
}

function getClientIdForTokenXTargetApi(targetApi: TokenXTargetApi): string {
  switch (targetApi) {
    case TokenXTargetApi.LUMI_API:
      return serverEnv.LUMI_API_CLIENT_ID;
    case TokenXTargetApi.SYFOMOTEBEHOV:
      return serverEnv.SYFOMOTEBEHOV_CLIENT_ID;
    case TokenXTargetApi.ISDIALOGMOTE:
      return serverEnv.ISDIALOGMOTE_CLIENT_ID;
    case TokenXTargetApi.DINESYKMELDTE_BACKEND:
      return serverEnv.DINESYKMELDTE_BACKEND_CLIEND_ID;
    default:
      return assertUnreachable(targetApi);
  }
}

function assertUnreachable(targetApi: never): never {
  throw new Error(`Unsupported TokenX target API: ${targetApi}`);
}
