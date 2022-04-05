import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { post } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { ExtMotebehovSvarArbeidsgiver } from "@/server/data/types/external/ExternalMotebehovTypes";
import serverLogger from "@/server/utils/serverLogger";

export const postMotebehovAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    serverLogger.info(req, "postMotebehovAG, request");
    const svar: ExtMotebehovSvarArbeidsgiver = req.body;
    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/motebehov`,
      svar,
      {
        accessToken: req.tokenSet.access_token,
      }
    );
  }

  next();
};
