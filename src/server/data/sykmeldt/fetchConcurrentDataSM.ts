import type { NextApiRequest } from "next";
import getMockDb from "@/server/data/mock/getMockDb";
import { getBrevSM } from "@/server/service/brevService";
import { getMotebehovSM } from "@/server/service/motebehovService";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import { isMockBackend } from "@/server/utils/serverEnv";
import type { Brev } from "@/types/shared/brev";

export const fetchConcurrentDataSM = async (
  req: NextApiRequest,
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
      getMotebehovSM(req),
      getBrevSM(req),
    ]);

    return { motebehov, brevArray };
  }
};
