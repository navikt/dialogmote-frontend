import { NextApiRequest } from "next";
import { post } from "@/common/api/fetch/fetch";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "@/server/auth/tokenXExchange";

export async function tokenXFetchPost<ResponseData>({
  req,
  targetApi,
  endpoint,
  data,
  responseType,
  personIdent,
  orgnummer,
}: {
  req: NextApiRequest;
  targetApi: TokenXTargetApi;
  endpoint: string;
  data?: unknown;
  responseType?: "json" | "arraybuffer";
  personIdent?: string;
  orgnummer?: string;
}): Promise<ResponseData> {
  const idPortenToken = await validateAndGetIdportenToken(req);
  const oboToken = await exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    targetApi
  );

  return post(endpoint, data, {
    accessToken: oboToken,
    responseType,
    personIdent,
    orgnummer,
  });
}
