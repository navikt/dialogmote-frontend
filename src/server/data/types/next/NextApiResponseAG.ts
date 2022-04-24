import { NextApiResponse } from "next";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";

export interface NextApiResponseAG extends NextApiResponse {
  sykmeldt: SykmeldtDTO;
  motebehov: MotebehovDTO;
  brevArray: Brev[];
  dialogmoteData: DialogmoteData;
}
