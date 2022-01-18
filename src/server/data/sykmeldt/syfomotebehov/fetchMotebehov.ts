import { IAuthenticatedRequest } from "../../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { mockSyfoMotebehov } from "@/server/data/sykmeldt/syfomotebehov/mock/mockSyfomotebehov";

export const fetchMotebehov = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { motebehovStatus: MotebehovStatus },
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehovStatus = mockSyfoMotebehov("MELD_BEHOV", false);
  } else {
    //TODO: Dropp syfoapi, gå rett mot syfomotebehov
    res.motebehovStatus = mockSyfoMotebehov("MELD_BEHOV", false);
  }

  next();
};
