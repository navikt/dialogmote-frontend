import { IAuthenticatedRequest } from "../../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { mockSyfoMotebehov } from "@/server/data/sykmeldt/syfomotebehov/mock/mockSyfomotebehov";
import serverEnv from "@/server/utils/serverEnv";
import { get } from "@/common/api/axios/axios";
import serverLogger from "@/server/utils/serverLogger";

export const fetchMotebehov = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { motebehovStatus: MotebehovStatus },
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehovStatus = mockSyfoMotebehov("MELD_BEHOV", false);
  } else {
    const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/v2/arbeidstaker/motebehov`;
    res.motebehovStatus = await get(url, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
