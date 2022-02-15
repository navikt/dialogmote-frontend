import { NextApiResponse } from "next";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogmoteDataAG } from "@/server/data/types/internal/DialogmoteType";

export interface NextApiResponseAG extends NextApiResponse {
  sykmeldt: Sykmeldt;
  motebehovStatus: MotebehovStatus;
  brevArray: Brev[];
  dialogmoteData: DialogmoteDataAG;
}
