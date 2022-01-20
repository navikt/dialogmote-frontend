import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import activeMockDataSM from "@/server/data/mock/activeMockDataSM";

export const fetchMotebehovSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { motebehovStatus: MotebehovStatus },
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehovStatus = activeMockDataSM.motebehov;
  } else {
    const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/v2/arbeidstaker/motebehov`;
    res.motebehovStatus = await get(url, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
