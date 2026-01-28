import { NextApiRequest } from "next";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "@/server/auth/tokenXExchange";

export async function getMotebehovTokenX(req: NextApiRequest): Promise<string> {
  const idPortenToken = await validateAndGetIdportenToken(req);
  return exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    TokenXTargetApi.SYFOMOTEBEHOV
  );
}

export async function getIsdialogmoteTokenX(
  req: NextApiRequest
): Promise<string> {
  const idPortenToken = await validateAndGetIdportenToken(req);
  return exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    TokenXTargetApi.ISDIALOGMOTE
  );
}

export async function getDinesykmeldteBackendTokenX(
  req: NextApiRequest
): Promise<string> {
  const idPortenToken = await validateAndGetIdportenToken(req);
  return exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    TokenXTargetApi.DINESYKMELDTE_BACKEND
  );
}
