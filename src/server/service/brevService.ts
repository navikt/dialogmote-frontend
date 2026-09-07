import type { NextApiRequest } from "next";
import { array } from "zod";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { tokenXFetchGet } from "@/server/tokenXFetch/tokenXFetchGet";
import serverEnv from "@/server/utils/serverEnv";
import { brevSchema } from "./schema/brevSchema";

const brevListSchema = array(brevSchema);

export async function getBrevAG(req: NextApiRequest, personIdent: string) {
  return tokenXFetchGet({
    req,
    targetApi: TokenXTargetApi.ISDIALOGMOTE,
    operation: RuntimeOperation.BREV_LIST_FETCH,
    endpoint: `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/narmesteleder/brev`,
    personIdent,
    responseDataSchema: brevListSchema,
  });
}

export async function getBrevSM(req: NextApiRequest) {
  return tokenXFetchGet({
    req,
    targetApi: TokenXTargetApi.ISDIALOGMOTE,
    operation: RuntimeOperation.BREV_LIST_FETCH,
    endpoint: `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/arbeidstaker/brev`,
    responseDataSchema: brevListSchema,
  });
}
