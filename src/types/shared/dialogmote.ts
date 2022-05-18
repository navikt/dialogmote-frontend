import { Brev, Referat } from "./brev";
import { Motebehov } from "./motebehov";
import { Sykmeldt } from "./sykmeldt";

export interface DialogmoteData {
  sykmeldt?: Sykmeldt;
  moteinnkalling?: Brev;
  referater: Referat[];
  motebehov?: Motebehov;
}
