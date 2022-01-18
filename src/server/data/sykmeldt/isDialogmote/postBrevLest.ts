import cookie from "cookie";
import { NextApiResponse } from "next";
import serverEnv from "../../../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import { post } from "@/common/api/axios/axios";
import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";

export const postBrevLest = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const { uuid } = req.query;
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev/${uuid}/les`;
    await post(url, undefined, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
