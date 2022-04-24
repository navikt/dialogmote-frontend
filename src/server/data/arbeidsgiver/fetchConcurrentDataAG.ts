import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { Brev } from "@/server/data/types/external/BrevTypes";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { activeLabsMockAG } from "../mock/activeLabsMock";
import { getMotebehovAG } from "@/server/service/motebehovService";

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

    const brevPromise = get<Brev[]>(
      `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/narmesteleder/brev`,
      {
        accessToken: req.loginServiceToken,
        personIdent: res.sykmeldt.fnr,
      }
    );

    await Promise.all([
      motebehovPromise.then((motebehov) => (res.motebehov = motebehov)),
      brevPromise.then((brev) => (res.brevArray = brev)),
    ]);
  }

  next();
};
