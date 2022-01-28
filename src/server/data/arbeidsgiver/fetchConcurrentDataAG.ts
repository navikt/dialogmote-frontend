import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import activeMockDataAG from "@/server/data/mock/activeMockDataAG";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { Brev } from "@/server/data/types/external/BrevTypes";

export const fetchConcurrentDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehovStatus = activeMockDataAG.motebehov;
    res.brevArray = activeMockDataAG.brev;
  } else {
    const motebehovPromise = get<MotebehovStatus>(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/v2/motebehov?fnr=${res.sykmeldt.fnr}&virksomhetsnummer=${res.sykmeldt.orgnummer}`,
      {
        accessToken: req.loginServiceToken,
      }
    );

    const brevPromise = get<Brev[]>(
      `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/narmesteleder/brev`,
      {
        accessToken: req.loginServiceToken,
        personIdent: res.sykmeldt.fnr,
      }
    );

    await Promise.all([
      motebehovPromise.then((motebehov) => (res.motebehovStatus = motebehov)),
      brevPromise.then((brev) => (res.brevArray = brev)),
    ]);
  }

  next();
};
