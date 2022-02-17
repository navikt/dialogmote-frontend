import { Brev } from "@/server/data/types/external/BrevTypes";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import { DialogMotebehov } from "@/server/data/types/internal/DialogMotebehovTypes";

export interface DialogmoteData {
  isSykmeldt: boolean;
  sykmeldtName?: string;
  moteinnkalling?: Brev;
  referater: Referat[];
  motebehov?: DialogMotebehov;
}
