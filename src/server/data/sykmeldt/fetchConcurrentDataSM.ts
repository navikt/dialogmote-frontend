import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { activeLabsMockSM } from "../mock/activeLabsMock";
import { getMotebehovSM } from "@/server/service/motebehovService";
import { getBrevSM } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";

export const fetchConcurrentDataSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSM,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.motebehov = activeLabsMockSM.motebehov;
      res.brevArray = activeLabsMockSM.brev;
    } else {
      res.motebehov = activeMockSM.motebehov;
      res.brevArray = activeMockSM.brev;
    }
  } else {
    const motebehovPromise = getMotebehovSM(req.loginServiceToken);
    const brevPromise = getBrevSM(req.loginServiceToken);

    const [motebehovRes, brevRes] = await Promise.all([
      motebehovPromise,
      brevPromise,
    ]);

    if (motebehovRes.success && brevRes.success) {
      res.motebehov = motebehovRes.data;
      res.brevArray = brevRes.data;
    } else if (!motebehovRes.success) {
      handleSchemaParsingError("Sykmeldt", "Motebehov", motebehovRes.error);
    } else if (!brevRes.success) {
      handleSchemaParsingError("Sykmeldt", "Brev", brevRes.error);
    }
  }

  next();
};
