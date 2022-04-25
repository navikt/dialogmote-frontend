import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { activeLabsMockAG } from "../mock/activeLabsMock";
import { getMotebehovAG } from "@/server/service/motebehovService";
import { getBrevAG } from "@/server/service/brevService";

export const fetchConcurrentDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.motebehov = activeLabsMockAG.motebehov;
      res.brevArray = activeLabsMockAG.brev;
    } else {
      res.motebehov = activeMockAG.motebehov;
      res.brevArray = activeMockAG.brev;
    }
  } else {
    const motebehovPromise = getMotebehovAG(
      res.sykmeldt.fnr,
      res.sykmeldt.orgnummer,
      req.loginServiceToken
    );

    const brevPromise = getBrevAG(req.loginServiceToken, res.sykmeldt.fnr);

    await Promise.all([
      motebehovPromise.then((motebehov) => (res.motebehov = motebehov)),
      brevPromise.then((brev) => (res.brevArray = brev)),
    ]);
  }

  next();
};
