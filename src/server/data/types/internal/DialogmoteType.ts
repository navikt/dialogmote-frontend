import { Brev } from "@/server/data/types/external/BrevTypes";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import { DialogMotebehov } from "@/server/data/types/internal/DialogMotebehovTypes";
import { Sykmeldt } from "../external/SykmeldteTypes";

export interface DialogmoteBaseData {
  moteinnkalling?: Brev;
  referater: Referat[];
  motebehov?: DialogMotebehov;
}
export interface DialogmoteDataAG extends DialogmoteBaseData {
  sykmeldt: Sykmeldt;
}

export interface DialogmoteDataSM extends DialogmoteBaseData {
  isSykmeldt: boolean;
}
