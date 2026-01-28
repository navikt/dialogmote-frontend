import { NextApiRequest } from "next";
import { get } from "@/common/api/fetch/fetch";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "@/server/auth/tokenXExchange";

export async function tokenXFetchGet<ResponseData>({
  req,
  targetApi,
  endpoint,
  responseType,
  personIdent,
  orgnummer,
}: {
  req: NextApiRequest;
  targetApi: TokenXTargetApi;
  endpoint: string;
  responseType?: "json" | "arraybuffer";
  personIdent?: string;
  orgnummer?: string;
}): Promise<ResponseData> {
  const idPortenToken = await validateAndGetIdportenToken(req);
  const oboToken = await exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    targetApi
  );

  return get(endpoint, {
    accessToken: oboToken,
    responseType,
    personIdent,
    orgnummer,
  });
}
