import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { Sykmelding } from "@/server/data/types/external/SykmeldingerTypes";
import activeMockSM from "@/server/data/mock/activeMockSM";

export const fetchConcurrentDataSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.isSykmeldt = activeMockSM.isSykmeldt;
    res.motebehovStatus = activeMockSM.motebehov;
    res.brevArray = activeMockSM.brev;
  } else {
    const isSykmeldtPromise = get<Sykmelding[]>(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/arbeidstaker/sykmeldinger?today=true`,
      {
        accessToken: req.loginServiceToken,
      }
    );

    const motebehovPromise = get<MotebehovStatus>(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/v2/arbeidstaker/motebehov`,
      {
        accessToken: req.loginServiceToken,
      }
    );

    const brevPromise = get<Brev[]>(
      `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`,
      {
        accessToken: req.loginServiceToken,
      }
    );

    await Promise.all([
      isSykmeldtPromise.then(
        (sykmeldinger) => (res.isSykmeldt = sykmeldinger?.length > 0)
      ),
      motebehovPromise.then((motebehov) => (res.motebehovStatus = motebehov)),
      brevPromise.then((brev) => (res.brevArray = brev)),
    ]);
  }

  next();
};
