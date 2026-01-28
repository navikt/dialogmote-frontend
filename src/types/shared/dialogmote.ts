import type { Brev, Referat } from "./brev";
import type { Motebehov } from "./motebehov";
import type { Sykmeldt } from "./sykmeldt";

export interface DialogmoteData {
  sykmeldt?: Sykmeldt;
  moteinnkalling?: Brev;
  referater: Referat[];
  motebehov?: Motebehov;
}
