import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { activeLabsMockAG } from "../mock/activeLabsMock";

export const fetchSykmeldtAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.sykmeldt = activeLabsMockAG.sykmeldt!!;
    } else {
      res.sykmeldt = activeMockAG.sykmeldt!!;
    }
  } else {
    const { narmestelederid } = req.query;
    const url = `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/dinesykmeldte/${narmestelederid}`;
    res.sykmeldt = await get(url, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
