import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { post } from "@/common/api/axios/axios";
import { MotebehovSvar } from "@/server/data/types/external/MotebehovTypes";
import serverEnv from "@/server/utils/serverEnv";

export const postMotebehovAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const svar: MotebehovSvar = req.body;
    await post(`${serverEnv.SYFOMOTEBEHOV_HOST}/v2/motebehov`, svar, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
