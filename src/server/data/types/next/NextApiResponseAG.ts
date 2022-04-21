import { NextApiResponse } from "next";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { ExtMotebehovStatus } from "@/server/data/types/external/ExternalMotebehovTypes";
import { Sykmeldt } from "types/shared/sykmeldt";

export interface NextApiResponseAG extends NextApiResponse {
  sykmeldt: Sykmeldt;
  motebehovStatus: ExtMotebehovStatus;
  brevArray: Brev[];
  dialogmoteData: DialogmoteData;
}
