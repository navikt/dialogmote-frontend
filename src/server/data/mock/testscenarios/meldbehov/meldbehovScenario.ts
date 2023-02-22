import { MockSetup } from "../../getMockDb";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";

export const meldbehovScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("MELD_BEHOV")
  .withSykmeldt(true)
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("MELD_BEHOV")
      .build()
  )
  .build();
