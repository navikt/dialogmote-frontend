import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { post } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { getMotebehovTokenX } from "@/server/auth/tokenx";
import { MotebehovSvarRequestAG } from "types/shared/motebehov";

export const postMotebehovAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const token = await getMotebehovTokenX(req);

    const svar: MotebehovSvarRequestAG = req.body;
    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/motebehov`,
      svar,
      {
        accessToken: token,
      }
    );
  }

  next();
};
