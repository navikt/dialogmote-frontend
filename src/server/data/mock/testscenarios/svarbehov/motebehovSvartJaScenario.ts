import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import type { MockSetup } from "../../getMockDb";

export const motebehovSvartJaScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("MOTEBEHOV_SVART_JA")
  .withSykmeldt(true)
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("SVAR_BEHOV")
      .withSubmittedMotebehov()
      .build(),
  )
  .build();
