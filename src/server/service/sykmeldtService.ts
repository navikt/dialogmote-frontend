import type { NextApiRequest } from "next";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { sykmeldtSchema } from "@/server/service/schema/sykmeldtSchema";
import { tokenXFetchGet } from "@/server/tokenXFetch/tokenXFetchGet";
import serverEnv from "@/server/utils/serverEnv";

export async function getSykmeldt(
  req: NextApiRequest,
  narmestelederid: string,
) {
  const url = `${serverEnv.DINESYKMELDTE_BACKEND_HOST}/api/v2/dinesykmeldte/${narmestelederid}`;

  return tokenXFetchGet({
    req,
    targetApi: TokenXTargetApi.DINESYKMELDTE_BACKEND,
    operation: RuntimeOperation.SYKMELDT_FETCH,
    endpoint: url,
    responseDataSchema: sykmeldtSchema,
  });
}
