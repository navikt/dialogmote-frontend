import type { NextApiResponse } from "next";
import type { DialogmoteData } from "types/shared/dialogmote";
import type { BrevDTO } from "@/server/service/schema/brevSchema";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";

export interface NextApiResponseSM extends NextApiResponse {
  motebehov: MotebehovStatusDTO;
  brevArray: BrevDTO[];
  dialogmoteData: DialogmoteData;
}
