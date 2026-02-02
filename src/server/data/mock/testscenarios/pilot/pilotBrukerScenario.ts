import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import type { MockSetup } from "../../getMockDb";

export const pilotBrukerScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("PILOT_BRUKER")
  .withSykmeldt(true)
  .withPilotUser(true)
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("MELD_BEHOV")
      .build(),
  )
  .build();
