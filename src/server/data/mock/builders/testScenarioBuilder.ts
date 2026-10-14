import {
  meldMotebehovAGOutputFixture,
  meldMotebehovSMResponseFixture,
  svarMotebehovAGOutputFixture,
  svarMotebehovSMResponseFixture,
} from "@/mocks/data/fixtures/form";
import type { MockSetup, TestScenario } from "@/server/data/mock/getMockDb";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import type { Brev } from "@/types/shared/brev";

export class TestScenarioBuilder {
  private readonly mockData: MockSetup;

  constructor() {
    this.mockData = {
      sykmeldt: undefined,
      brev: [],
      motebehovSM: {
        visMotebehov: false,
        skjemaType: "MELD_BEHOV",
        motebehov: null,
      },
      motebehovAG: {
        visMotebehov: false,
        skjemaType: "MELD_BEHOV",
        motebehov: null,
      },
      activeTestScenario: "MELD_BEHOV",
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
    this.mockData.motebehovSM = structuredClone(motebehov);
    this.mockData.motebehovAG = structuredClone(motebehov);

    const smSubmission = this.mockData.motebehovSM.motebehov;
    const agSubmission = this.mockData.motebehovAG.motebehov;
    const isSvar = motebehov.skjemaType === "SVAR_BEHOV";

    if (smSubmission) {
      smSubmission.innmelderType = "ARBEIDSTAKER";
      smSubmission.formValues.formSnapshot = {
        formIdentifier: isSvar
          ? "motebehov-arbeidstaker-svar"
          : "motebehov-arbeidstaker-meld",
        formSemanticVersion: "1.0.0",
        fieldSnapshots: structuredClone(
          isSvar
            ? svarMotebehovSMResponseFixture
            : meldMotebehovSMResponseFixture,
        ),
      };
    }

    if (agSubmission) {
      agSubmission.innmelderType = "ARBEIDSGIVER";
      agSubmission.formValues.formSnapshot = {
        formIdentifier: isSvar
          ? "motebehov-arbeidsgiver-svar"
          : "motebehov-arbeidsgiver-meld",
        formSemanticVersion: "1.0.0",
        fieldSnapshots: structuredClone(
          isSvar ? svarMotebehovAGOutputFixture : meldMotebehovAGOutputFixture,
        ),
      };
    }
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
