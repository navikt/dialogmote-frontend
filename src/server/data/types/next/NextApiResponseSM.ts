import { NextApiResponse } from "next";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";

export interface NextApiResponseSM extends NextApiResponse {
  motebehov: MotebehovDTO;
  brevArray: Brev[];
  dialogmoteData: DialogmoteData;
}
