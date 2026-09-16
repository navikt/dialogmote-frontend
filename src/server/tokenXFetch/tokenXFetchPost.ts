import type { NextApiRequest } from "next";
import type { z } from "zod";
import { post } from "@/common/api/fetch";
import { HttpError } from "@/common/utils/errors/HttpError";
import { validateAndGetIdportenToken } from "@/server/auth/idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  type TokenXTargetApi,
} from "@/server/auth/tokenXExchange";
import {
  logResponseSchemaFailure,
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
  args: TokenXFetchPostBaseArgs & {
    responseType?: "json";
    responseDataSchema?: never;
  },
): Promise<ResponseData>;
export function tokenXFetchPost<S extends z.ZodType>(
  args: TokenXFetchPostBaseArgs & {
    responseDataSchema: S;
    responseType?: "json";
  },
): Promise<z.infer<S>>;
export function tokenXFetchPost(
  args: TokenXFetchPostBaseArgs & {
    responseType: "arraybuffer";
    responseDataSchema?: never;
  },
): Promise<Uint8Array>;
export async function tokenXFetchPost({
  req,
  targetApi,
  operation,
  endpoint,
  data,
  responseType,
  responseDataSchema,
  personIdent,
  orgnummer,
}: TokenXFetchPostBaseArgs & {
  responseType?: "json" | "arraybuffer";
  responseDataSchema?: z.ZodType;
}): Promise<unknown | Uint8Array> {
  const idPortenToken = await validateAndGetIdportenToken(req);
  const oboToken = await exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    targetApi,
  );

  let response: unknown | Uint8Array;
  try {
    response =
      responseType === "arraybuffer"
        ? await post<Uint8Array, "arraybuffer">(endpoint, data, {
            accessToken: oboToken,
            responseType,
            personIdent,
            orgnummer,
          })
        : await post<unknown>(endpoint, data, {
            accessToken: oboToken,
            responseType,
            personIdent,
            orgnummer,
          });
  } catch (error) {
    logUpstreamRequestFailure({
      operation,
      targetApi,
      method: "POST",
      error,
    });
    throw error;
  }

  if (responseDataSchema === undefined) {
    return response;
  }

  const parsed = responseDataSchema.safeParse(response);
  if (!parsed.success) {
    logResponseSchemaFailure({
      operation,
      targetApi,
      method: "POST",
      validationError: parsed.error,
    });
    throw new HttpError(500, "Upstream response did not match expected schema");
  }

  return parsed.data;
}
