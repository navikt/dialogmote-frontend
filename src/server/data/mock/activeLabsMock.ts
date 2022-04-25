import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";
import { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import { Brev } from "types/shared/brev";
import { innkallingAG, innkallingSM } from "./labs/innkalling";
import { referat1, referat2 } from "./labs/referat";

interface IMockData {
  sykmeldt?: SykmeldtDTO; //For arbeidsgiver
  brev: Brev[];
  motebehov: MotebehovDTO;
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
