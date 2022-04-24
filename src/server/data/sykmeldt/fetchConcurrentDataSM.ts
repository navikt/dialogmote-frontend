import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import { Brev } from "@/server/data/types/external/BrevTypes";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { activeLabsMockSM } from "../mock/activeLabsMock";
import { getMotebehovSM } from "@/server/service/motebehovService";

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

    const brevPromise = get<Brev[]>(
      `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`,
      {
        accessToken: req.loginServiceToken,
      }
    );

    await Promise.all([
      motebehovPromise.then((motebehov) => (res.motebehov = motebehov)),
      brevPromise.then((brev) => (res.brevArray = brev)),
    ]);
  }

  next();
};
