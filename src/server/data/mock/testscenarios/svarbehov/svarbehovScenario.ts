import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import type { MockSetup } from "../../getMockDb";

export const svarbehovScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("SVAR_BEHOV")
  .withSykmeldt(true)
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("SVAR_BEHOV")
      .build(),
  )
  .build();
