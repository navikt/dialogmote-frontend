import { Brev } from "@/server/data/types/external/BrevTypes";
import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";
import { ExtMotebehovStatus } from "@/server/data/types/external/ExternalMotebehovTypes";

interface IMockData {
  isSykmeldt: boolean; //For arbeidstaker
  sykmeldt?: Sykmeldt; //For arbeidsgiver
  brev: Brev[];
  motebehov: ExtMotebehovStatus;
}

export class MockDataBuilder {
  private readonly mockData: IMockData;

  constructor() {
    this.mockData = {
      isSykmeldt: true,
      sykmeldt: undefined,
      brev: [],
      motebehov: {
        visMotebehov: false,
      },
    };
  }

  withIsSykmeldt(isSykmeldt: boolean): MockDataBuilder {
    this.mockData.isSykmeldt = isSykmeldt;
    return this;
  }

  withSykmeldt(isSykmeldt: boolean): MockDataBuilder {
    this.mockData.sykmeldt = isSykmeldt
      ? {
          narmestelederId: "123",
          orgnummer: "000111222",
          fnr: "01010112345",
          navn: "Kreativ Hatt",
          aktivSykmelding: true,
        }
      : undefined;
    return this;
  }

  withBrev(brev: Brev): MockDataBuilder {
    this.mockData.brev.push(brev);
    return this;
  }

  withMotebehov(motebehov: ExtMotebehovStatus) {
    this.mockData.motebehov = motebehov;
    return this;
  }

  build(): IMockData {
    return this.mockData;
  }
}
