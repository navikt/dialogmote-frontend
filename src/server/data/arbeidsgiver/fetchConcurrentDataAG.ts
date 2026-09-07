import { logger } from "@navikt/next-logger";
import type { NextApiRequest } from "next";
import getMockDb from "@/server/data/mock/getMockDb";
import { getBrevAG } from "@/server/service/brevService";
import { getMotebehovAG } from "@/server/service/motebehovService";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import { isMockBackend } from "@/server/utils/serverEnv";
import type { Brev } from "@/types/shared/brev";

export const fetchConcurrentDataAG = async (
  req: NextApiRequest,
  fnr: string,
  orgnummer: string,
): Promise<
  | {
      motebehov: MotebehovStatusDTO;
      brevArray: Brev[];
    }
  | undefined
> => {
  if (isMockBackend) {
    const mockData = getMockDb(req);
    return { motebehov: mockData.motebehov, brevArray: mockData.brev };
  } else {
    const [motebehov, brevArray] = await Promise.all([
      getMotebehovAG(req, fnr, orgnummer),
      getBrevAG(req, fnr),
    ]);
    logger.info("Fetching DM data AG ok");

    return { motebehov, brevArray };
  }
};
