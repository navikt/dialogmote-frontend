import { logger } from "@navikt/next-logger";
import type { NextApiRequest } from "next";
import type { z } from "zod";
import { get } from "@/common/api/fetch";
import { HttpError } from "@/common/utils/errors/HttpError";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  type TokenXTargetApi,
} from "@/server/auth/tokenXExchange";

type TokenXFetchGetBaseArgs = {
  req: NextApiRequest;
  targetApi: TokenXTargetApi;
  endpoint: string;
  personIdent?: string;
  orgnummer?: string;
};

export function tokenXFetchGet<S extends z.ZodType>(
  args: TokenXFetchGetBaseArgs & {
    responseDataSchema: S;
    responseType?: "json";
  },
): Promise<z.infer<S>>;
export function tokenXFetchGet(
  args: TokenXFetchGetBaseArgs & { responseType: "arraybuffer" },
): Promise<Uint8Array>;
export async function tokenXFetchGet<S extends z.ZodType>({
  req,
  targetApi,
  endpoint,
  responseType,
  personIdent,
  orgnummer,
  responseDataSchema,
}: TokenXFetchGetBaseArgs & {
  responseType?: "json" | "arraybuffer";
  responseDataSchema?: S;
}): Promise<z.infer<S> | Uint8Array> {
  const idPortenToken = await validateAndGetIdportenToken(req);
  const oboToken = await exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    targetApi,
  );

  if (responseType === "arraybuffer") {
    return get<Uint8Array, "arraybuffer">(endpoint, {
      accessToken: oboToken,
      responseType: "arraybuffer",
      personIdent,
      orgnummer,
    });
  }

  const response = await get<unknown>(endpoint, {
    accessToken: oboToken,
    responseType: "json",
    personIdent,
    orgnummer,
  });

  if (!responseDataSchema) {
    const message = `Missing responseDataSchema for tokenXFetchGet(${endpoint})`;
    logger.error(message);
    throw new HttpError(500, message);
  }

  const parsed = responseDataSchema.safeParse(response);
  if (!parsed.success) {
    const message = `Failed to parse response from ${endpoint}: ${parsed.error.toString()}`;
    logger.error(message);
    throw new HttpError(500, message);
  }

  return parsed.data;
}

export function tokenXFetchGetBytes(
  args: TokenXFetchGetBaseArgs,
): Promise<Uint8Array> {
  return tokenXFetchGet({
    ...args,
    responseType: "arraybuffer",
  });
}
