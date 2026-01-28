import { NextApiRequest } from "next";
import { post } from "@/common/api/fetch";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "@/server/auth/tokenXExchange";

type TokenXFetchPostBaseArgs = {
  req: NextApiRequest;
  targetApi: TokenXTargetApi;
  endpoint: string;
  data?: unknown;
  personIdent?: string;
  orgnummer?: string;
};

export function tokenXFetchPost<ResponseData>(
  args: TokenXFetchPostBaseArgs & { responseType?: "json" }
): Promise<ResponseData>;
export function tokenXFetchPost(
  args: TokenXFetchPostBaseArgs & { responseType: "arraybuffer" }
): Promise<Uint8Array>;
export async function tokenXFetchPost<ResponseData>({
  req,
  targetApi,
  endpoint,
  data,
  responseType,
  personIdent,
  orgnummer,
}: TokenXFetchPostBaseArgs & {
  responseType?: "json" | "arraybuffer";
}): Promise<ResponseData | Uint8Array> {
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
