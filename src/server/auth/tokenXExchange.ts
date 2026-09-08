import { logger } from "@navikt/next-logger";
import { requestTokenxOboToken } from "@navikt/oasis";
import { HttpError } from "@/common/utils/errors/HttpError";
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
  } catch {
    throwTokenXExchangeError(targetApi);
  }

  if (!tokenXGrant.ok) {
    // Oasis does not distinguish rejected grants from provider/network failures.
    // The ID-porten token was already validated before requesting this exchange.
    throwTokenXExchangeError(targetApi);
  }

  return tokenXGrant.token;
}

function throwTokenXExchangeError(targetApi: TokenXTargetApi): never {
  logger.error(
    {
      event_type: "tokenx_obo_exchange_failed",
      operation: "exchange_tokenx_obo",
      error_code: "TOKENX_OBO_EXCHANGE_ERROR",
      upstream: tokenXTargetApiToUpstream(targetApi),
    },
    "TokenX OBO exchange failed",
  );
  throw new HttpError(500, "TokenX OBO exchange failed");
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
