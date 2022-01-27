import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import activeMockDataAG from "@/server/data/mock/activeMockDataAG";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";

export const fetchIsSykmeldtAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    res.sykmeldt = activeMockDataAG.sykmeldt;
  } else {
    const { narmestelederid } = req.query;
    const url = `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/dinesykmeldte/${narmestelederid}`;
    res.sykmeldt = await get(url, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
