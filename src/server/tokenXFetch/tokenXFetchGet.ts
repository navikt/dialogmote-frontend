import type { NextApiRequest } from "next";
import type { z } from "zod";
import { get } from "@/common/api/fetch";
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

type TokenXFetchGetBaseArgs = {
  req: NextApiRequest;
  targetApi: TokenXTargetApi;
  operation: RuntimeOperation;
  endpoint: string;
  personIdent?: string;
  orgnummer?: string;
};

const withTokenXGet = async <ResponseData>(
  { req, targetApi, operation, endpoint }: TokenXFetchGetBaseArgs,
  request: (accessToken: string) => Promise<ResponseData>,
): Promise<ResponseData> => {
  const idPortenToken = await validateAndGetIdportenToken(req);
  const accessToken = await exchangeIdPortenTokenForTokenXOboToken(
    idPortenToken,
    targetApi,
  );

  try {
    return await request(accessToken);
  } catch (error) {
    logUpstreamRequestFailure({
      operation,
      targetApi,
      endpoint,
      method: "GET",
      error,
    });
    throw error;
  }
};

export async function tokenXFetchGet<S extends z.ZodType>({
  responseDataSchema,
  ...args
}: TokenXFetchGetBaseArgs & {
  responseDataSchema: S;
}): Promise<z.infer<S>> {
  const response = await withTokenXGet<unknown>(args, (accessToken) =>
    get<unknown>(args.endpoint, {
      accessToken,
      responseType: "json",
      personIdent: args.personIdent,
      orgnummer: args.orgnummer,
    }),
  );

  const parsed = responseDataSchema.safeParse(response);
  if (!parsed.success) {
    logResponseSchemaFailure({
      operation: args.operation,
      targetApi: args.targetApi,
      endpoint: args.endpoint,
      errorCode: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
    });
    throw new HttpError(500, "Upstream response did not match expected schema");
  }

  return parsed.data;
}

export function tokenXFetchGetBytes({
  req,
  targetApi,
  operation,
  endpoint,
  personIdent,
  orgnummer,
}: TokenXFetchGetBaseArgs): Promise<Uint8Array> {
  return withTokenXGet(
    { req, targetApi, operation, endpoint, personIdent, orgnummer },
    (accessToken) =>
      get<Uint8Array, "arraybuffer">(endpoint, {
        accessToken,
        responseType: "arraybuffer",
        personIdent,
        orgnummer,
      }),
  );
}
