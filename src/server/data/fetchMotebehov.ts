import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { mockSyfoMotebehov } from "@/server/data/mock/syfomotebehov/mockSyfomotebehov";

export const fetchMotebehov = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { motebehovStatus: MotebehovStatus },
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehovStatus = mockSyfoMotebehov("MELD_BEHOV", false);
  } else {
    //TODO: Finn ut av syfoapi osv, om det er nødvendig.
    res.motebehovStatus = mockSyfoMotebehov("MELD_BEHOV", false);
  }

  next();
};
