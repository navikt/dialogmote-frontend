import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import serverEnv from "@/server/utils/serverEnv";
import {
  get,
  NAV_PERSONIDENT_HEADER,
  ORGNUMMER_HEADER,
} from "@/common/api/axios/axios";
import activeMockDataAG from "@/server/data/mock/activeMockDataAG";

export const fetchMotebehovAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { motebehovStatus: MotebehovStatus },
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehovStatus = activeMockDataAG.motebehov;
  } else {
    const personident = req.headers[NAV_PERSONIDENT_HEADER];
    const orgnummer = req.headers[ORGNUMMER_HEADER];
    const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/v2/motebehov?fnr=${personident}&virksomhetsnummer=${orgnummer}`;
    res.motebehovStatus = await get(url, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
