import { IAuthenticatedRequest } from "../../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { Brev } from "@/common/api/types/brevTypes";
import serverEnv from "../../../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import isDialogmoteMockSetup1 from "./mock/isDialogmoteMockSetup1";
import { get } from "@/common/api/axios/axios";

export const fetchBrev = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { brevArray: Brev[] },
  next: () => void
) => {
  if (isMockBackend) {
    res.brevArray = isDialogmoteMockSetup1;
  } else {
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`;
    res.brevArray = await get(url, { accessToken: req.loginServiceToken });
  }

  next();
};
