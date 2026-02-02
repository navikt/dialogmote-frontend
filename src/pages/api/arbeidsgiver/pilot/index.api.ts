import { logger } from "@navikt/next-logger";
import type { NextApiRequest, NextApiResponse } from "next";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { personSchema } from "@/server/service/schema/personSchema";
import { tokenXFetchGet } from "@/server/tokenXFetch/tokenXFetchGet";
import { getSykmeldtFnrFromHeader } from "@/server/utils/requestUtils";
import serverEnv from "@/server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const sykmeldtFnr = getSykmeldtFnrFromHeader(req);
    const response = await tokenXFetchGet({
      req,
      targetApi: TokenXTargetApi.OPPFOLGINGSPLAN_BACKEND,
      endpoint: `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/person`,
      personIdent: sykmeldtFnr,
      responseDataSchema: personSchema,
    });
    res.status(200).json(response.pilotUser);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Pilot lookup failed: ${message}`);
    res.status(200).json(false);
  }
};

export default handler;
