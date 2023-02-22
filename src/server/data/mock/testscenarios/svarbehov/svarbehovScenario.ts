import { MockSetup } from "../../getMockDb";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";

export const svarbehovScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("SVAR_BEHOV")
  .withSykmeldt(true)
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("SVAR_BEHOV")
      .build()
  )
  .build();
