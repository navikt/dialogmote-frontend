import { Brev } from "@/server/data/types/external/BrevTypes";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import { Motebehov } from "@/server/data/types/internal/MotebehovTypes";

export interface DialogmoteData {
  isSykmeldt: boolean;
  sykmeldtName?: string;
  moteinnkalling?: Brev;
  referater: Referat[];
  motebehov?: Motebehov;
}
