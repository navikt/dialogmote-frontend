import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import activeMockDataAG from "@/server/data/mock/activeMockDataAG";
import { Sykmeldt } from "@/common/api/types/sykmeldteTypes";

export const fetchSykmeldtAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { sykmeldt: Sykmeldt },
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
