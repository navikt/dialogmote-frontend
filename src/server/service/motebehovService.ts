import type { NextApiRequest } from "next";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { tokenXFetchGet } from "@/server/tokenXFetch/tokenXFetchGet";
import serverEnv from "@/server/utils/serverEnv";
import { motebehovStatusSchema } from "./schema/motebehovSchema";

export async function getMotebehovAG(
  req: NextApiRequest,
  fnr: string,
  orgnummer: string,
  narmesteLederId: string,
) {
  const query = new URLSearchParams({
    fnr,
    virksomhetsnummer: orgnummer,
    narmesteLederId,
  });
  const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/motebehov?${query}`;

  return tokenXFetchGet({
    req,
    targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
    operation: RuntimeOperation.MOTEBEHOV_FETCH,
    endpoint: url,
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
