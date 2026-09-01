import type { NextApiRequest } from "next";
import { post } from "@/common/api/fetch";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  type TokenXTargetApi,
} from "@/server/auth/tokenXExchange";
import {
  logUpstreamRequestFailure,
  type RuntimeOperation,
} from "@/server/observability/runtimeErrorContract";

type TokenXFetchPostBaseArgs = {
  req: NextApiRequest;
  targetApi: TokenXTargetApi;
  operation: RuntimeOperation;
  endpoint: string;
  data?: unknown;
  personIdent?: string;
  orgnummer?: string;
};

export function tokenXFetchPost<ResponseData>(
  args: TokenXFetchPostBaseArgs & { responseType?: "json" },
): Promise<ResponseData>;
export function tokenXFetchPost(
  args: TokenXFetchPostBaseArgs & { responseType: "arraybuffer" },
): Promise<Uint8Array>;
export async function tokenXFetchPost<ResponseData>({
  req,
  targetApi,
  operation,
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
    targetApi,
  );

  try {
    return await post(endpoint, data, {
      accessToken: oboToken,
      responseType,
      personIdent,
      orgnummer,
    });
  } catch (error) {
    logUpstreamRequestFailure({
      operation,
      targetApi,
      endpoint,
      method: "POST",
      error,
    });
    throw error;
  }
}
