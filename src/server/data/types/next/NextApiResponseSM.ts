import { NextApiResponse } from "next";
import { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import { BrevDTO } from "@/server/service/schema/brevSchema";
import { DialogmoteData } from "types/shared/dialogmote";

export interface NextApiResponseSM extends NextApiResponse {
  motebehov: MotebehovStatusDTO;
  brevArray: BrevDTO[];
  dialogmoteData: DialogmoteData;
}
