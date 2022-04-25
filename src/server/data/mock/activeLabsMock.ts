import { Brev } from "../types/external/BrevTypes";
import { ExtMotebehovStatus } from "../types/external/ExternalMotebehovTypes";
import { Sykmeldt } from "../types/external/SykmeldteTypes";
import { innkallingAG, innkallingSM } from "./labs/innkalling";
import { referat1, referat2 } from "./labs/referat";

interface IMockData {
  sykmeldt?: Sykmeldt; //For arbeidsgiver
  brev: Brev[];
  motebehov: ExtMotebehovStatus;
}

export const activeLabsMockAG: IMockData = {
  sykmeldt: {
    narmestelederId: "123",
    orgnummer: "000111222",
    fnr: "01010112345",
    navn: "Kreativ Hatt",
    aktivSykmelding: true,
  },
  brev: [innkallingAG, referat1, referat2],
  motebehov: { visMotebehov: false },
};

export const activeLabsMockSM: IMockData = {
  brev: [innkallingSM, referat1, referat2],
  motebehov: { visMotebehov: false },
};
