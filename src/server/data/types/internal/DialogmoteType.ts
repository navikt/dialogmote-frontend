import { Brev } from "@/server/data/types/external/BrevTypes";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import { Motebehov } from "types/shared/motebehov";
import { Sykmeldt } from "types/shared/sykmeldt";

export interface DialogmoteData {
  sykmeldt?: Sykmeldt;
  moteinnkalling?: Brev;
  referater: Referat[];
  motebehov?: Motebehov;
}
