import { Brev as ExternalBrev } from "@/server/data/types/external/BrevTypes";
import { Brev } from "@/server/data/types/internal/BrevTypes";
import { DialogMotebehov } from "@/server/data/types/internal/DialogMotebehovTypes";

export interface DialogmoteData {
  isSykmeldt: boolean;
  moteinnkalling?: ExternalBrev;
  referater: Brev[];
  motebehov?: DialogMotebehov;
}
