import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogMotebehov } from "@/server/data/types/internal/DialogMotebehovTypes";

export interface DialogmoteData {
  isSykmeldt: boolean;
  moteinnkalling?: Brev;
  referater: Brev[];
  motebehov?: DialogMotebehov;
}
