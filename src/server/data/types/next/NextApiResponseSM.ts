import { NextApiResponse } from "next";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { ExtMotebehovStatus } from "@/server/data/types/external/ExternalMotebehovTypes";

export interface NextApiResponseSM extends NextApiResponse {
  motebehovStatus: ExtMotebehovStatus;
  brevArray: Brev[];
  dialogmoteData: DialogmoteData;
}
