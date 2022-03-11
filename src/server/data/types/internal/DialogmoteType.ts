import { Brev } from "@/server/data/types/external/BrevTypes";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import { Motebehov } from "@/server/data/types/internal/MotebehovTypes";
import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";

export interface DialogmoteData {
  sykmeldt?: Sykmeldt;
  moteinnkalling?: Brev;
  referater: Referat[];
  motebehov?: Motebehov;
}
