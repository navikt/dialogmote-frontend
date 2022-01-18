import { IAuthenticatedRequest } from "../../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv from "../../../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import { SvarRespons } from "@/common/api/types/brevTypes";
import { post } from "@/common/api/axios/axios";

export const postBrevSvar = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const { uuid } = req.query;
    const svar: SvarRespons = req.body;
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev/${uuid}/pdf`;
    await post(url, svar, { accessToken: req.loginServiceToken });
  }

  next();
};
