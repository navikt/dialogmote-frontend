import { NextApiRequest } from "next";
import { get } from "@/common/api/fetch";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "@/server/auth/tokenXExchange";

type TokenXFetchGetBaseArgs = {
  req: NextApiRequest;
  targetApi: TokenXTargetApi;
  endpoint: string;
  personIdent?: string;
  orgnummer?: string;
};

export function tokenXFetchGet<ResponseData>(
  args: TokenXFetchGetBaseArgs & { responseType?: "json" }
): Promise<ResponseData>;
export function tokenXFetchGet(
  args: TokenXFetchGetBaseArgs & { responseType: "arraybuffer" }
): Promise<Uint8Array>;
export async function tokenXFetchGet<ResponseData>({
  req,
  targetApi,
  endpoint,
  responseType,
  personIdent,
  orgnummer,
}: TokenXFetchGetBaseArgs & { responseType?: "json" | "arraybuffer" }): Promise<
  ResponseData | Uint8Array
> {
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

export function tokenXFetchGetBytes(
  args: TokenXFetchGetBaseArgs
): Promise<Uint8Array> {
  return tokenXFetchGet({
    ...args,
    responseType: "arraybuffer",
  });
}
