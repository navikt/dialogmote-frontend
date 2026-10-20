import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import type { MockSetup } from "../../getMockDb";

export const motebehovMeldtScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("MOTEBEHOV_MELDT")
  .withSykmeldt(true)
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("MELD_BEHOV")
      .withSubmittedMotebehov()
      .build(),
  )
  .build();
