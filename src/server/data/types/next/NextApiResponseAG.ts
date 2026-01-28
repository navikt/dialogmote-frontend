import type { NextApiResponse } from "next";
import type { DialogmoteData } from "types/shared/dialogmote";
import type { BrevDTO } from "@/server/service/schema/brevSchema";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import type { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";

export interface NextApiResponseAG extends NextApiResponse {
  sykmeldt: SykmeldtDTO;
  motebehov: MotebehovStatusDTO;
  brevArray: BrevDTO[];
  dialogmoteData: DialogmoteData;
}
