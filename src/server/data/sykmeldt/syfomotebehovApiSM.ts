import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { post } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { ExtMotebehovSvar } from "@/server/data/types/external/ExternalMotebehovTypes";

export const postMotebehovSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const svar: ExtMotebehovSvar = req.body;
    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/v2/arbeidstaker/motebehov`,
      svar,
      {
        accessToken: req.loginServiceToken,
      }
    );
  }

  next();
};
