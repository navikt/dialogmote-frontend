import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { Brev } from "@/server/data/types/external/BrevTypes";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { ExtMotebehovStatus } from "@/server/data/types/external/ExternalMotebehovTypes";

export const fetchConcurrentDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehovStatus = activeMockAG.motebehov;
    res.brevArray = activeMockAG.brev;
  } else {
    const motebehovPromise = get<ExtMotebehovStatus>(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v2/motebehov?fnr=${res.sykmeldt.fnr}&virksomhetsnummer=${res.sykmeldt.orgnummer}`,
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
