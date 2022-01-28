import { NextApiResponse } from "next";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";

export interface NextApiResponseSM extends NextApiResponse {
  isSykmeldt: boolean;
  motebehovStatus: MotebehovStatus;
  brevArray: Brev[];
  dialogmoteData: DialogmoteData;
}
