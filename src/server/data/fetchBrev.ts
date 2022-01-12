import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { Brev } from "@/common/api/types/brevTypes";
import ProtectedApi from "../api/ProtectedApi";
import serverEnv from "../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import isDialogmoteMockSetup1 from "../data/mock/isDialogmote/isDialogmoteMockSetup1";

export const fetchBrev = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { brevArray: Brev[] },
  next: () => void
) => {
  if (isMockBackend) {
    res.brevArray = isDialogmoteMockSetup1;
  } else {
    const api = new ProtectedApi(req.tokenSet.access_token);
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`;
    res.brevArray = await api.get(url);
  }

  next();
};
