import type { NextApiRequest } from "next";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { tokenXFetchGet } from "@/server/tokenXFetch/tokenXFetchGet";
import serverEnv from "@/server/utils/serverEnv";
import { motebehovStatusSchema } from "./schema/motebehovSchema";

export async function getMotebehovAG(
  req: NextApiRequest,
  narmesteLederId: string,
) {
  return tokenXFetchGet({
    req,
    targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
    operation: RuntimeOperation.MOTEBEHOV_FETCH,
    endpoint: `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v5/arbeidsgiver/motebehov/${narmesteLederId}`,
    responseDataSchema: motebehovStatusSchema,
  });
}

export async function getMotebehovSM(req: NextApiRequest) {
  return tokenXFetchGet({
    req,
    targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
    operation: RuntimeOperation.MOTEBEHOV_FETCH,
    endpoint: `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/arbeidstaker/motebehov`,
    responseDataSchema: motebehovStatusSchema,
  });
}
