import { requestTokenxOboToken } from "@navikt/oasis";
import { logger } from "@navikt/next-logger";
import { HttpError } from "@/common/utils/errors/HttpError";
import serverEnv from "@/server/utils/serverEnv";

export enum TokenXTargetApi {
  SYFOMOTEBEHOV = "SYFOMOTEBEHOV",
  ISDIALOGMOTE = "ISDIALOGMOTE",
  DINESYKMELDTE_BACKEND = "DINESYKMELDTE_BACKEND",
}

export async function exchangeIdPortenTokenForTokenXOboToken(
  idPortenToken: string,
  targetApi: TokenXTargetApi
): Promise<string> {
  const clientId = getClientIdForTokenXTargetApi(targetApi);
  const tokenXGrant = await requestTokenxOboToken(idPortenToken, clientId);

  if (!tokenXGrant.ok) {
    logger.error(
      `Failed TokenX OBO for client id: ${clientId} (${targetApi}). Error message: ${tokenXGrant.error}`
    );
    throw new HttpError(401, "Login required");
  }

  return tokenXGrant.token;
}

function getClientIdForTokenXTargetApi(targetApi: TokenXTargetApi): string {
  switch (targetApi) {
    case TokenXTargetApi.SYFOMOTEBEHOV:
      return serverEnv.SYFOMOTEBEHOV_CLIENT_ID;
    case TokenXTargetApi.ISDIALOGMOTE:
      return serverEnv.ISDIALOGMOTE_CLIENT_ID;
    case TokenXTargetApi.DINESYKMELDTE_BACKEND:
      return serverEnv.DINESYKMELDTE_BACKEND_CLIEND_ID;
    default:
      return "" as never;
  }
}
