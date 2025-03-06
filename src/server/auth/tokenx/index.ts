import { grant } from "./tokenx.grant";
import { logger } from "@navikt/next-logger";
import { HttpError } from "@/common/utils/errors/HttpError";
import serverEnv from "@/server/utils/serverEnv";
import { NextApiRequest } from "next";
import { getIdportenToken } from "@/server/auth/idporten/idportenToken";

async function getTokenX(
  subjectToken: string,
  audience: string
): Promise<string> {
  let tokenX;

  try {
    tokenX = await grant(subjectToken, audience);
  } catch (e) {
    logger.error(
      `Failed grant for client id: ${audience}. Error message: ${e}`
    );
    throw new HttpError(401, "Login required");
  }

  if (!tokenX.access_token) {
    logger.error(`Token X missing access token for client id: ${audience}`);
    throw new HttpError(401, "Login required");
  }

  return tokenX.access_token;
}

export async function getMotebehovTokenX(req: NextApiRequest): Promise<string> {
  const idPortenToken = await getIdportenToken(req);
  return getTokenX(idPortenToken, serverEnv.SYFOMOTEBEHOV_CLIENT_ID);
}

export async function getIsdialogmoteTokenX(
  req: NextApiRequest
): Promise<string> {
  const idPortenToken = await getIdportenToken(req);
  return getTokenX(idPortenToken, serverEnv.ISDIALOGMOTE_CLIENT_ID);
}

export async function getDinesykmeldteBackendTokenX(
  req: NextApiRequest
): Promise<string> {
  const idPortenToken = await getIdportenToken(req);
  return getTokenX(idPortenToken, serverEnv.DINESYKMELDTE_BACKEND_CLIEND_ID);
}
