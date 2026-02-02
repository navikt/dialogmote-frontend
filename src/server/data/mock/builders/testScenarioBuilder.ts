import type { Brev } from "types/shared/brev";
import type { MockSetup, TestScenario } from "@/server/data/mock/getMockDb";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";

export class TestScenarioBuilder {
  private readonly mockData: MockSetup;

  constructor() {
    this.mockData = {
      sykmeldt: undefined,
      brev: [],
      motebehov: {
        visMotebehov: false,
        skjemaType: "MELD_BEHOV",
        motebehov: null,
      },
      activeTestScenario: "MELD_BEHOV",
      person: {
        pilotUser: false,
      },
    };
  }

  withSykmeldt(isSykmeldt: boolean): TestScenarioBuilder {
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

  withBrev(brev: Brev): TestScenarioBuilder {
    this.mockData.brev.push(brev);
    return this;
  }

  withMotebehov(motebehov: MotebehovStatusDTO) {
    this.mockData.motebehov = motebehov;
    return this;
  }

  withPilotUser(isPilotUser: boolean): TestScenarioBuilder {
    this.mockData.person.pilotUser = isPilotUser;
    return this;
  }

  withTestScenario(testscenario: TestScenario) {
    this.mockData.activeTestScenario = testscenario;
    return this;
  }

  build(): MockSetup {
    return this.mockData;
  }
}
