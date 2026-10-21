import { leggTilDagerPaDato } from "@/common/utils/dateUtils";
import { moteinnkallingDocument } from "@/server/data/mock/brev/moteinnkallingDocument";
import { BrevBuilder } from "@/server/data/mock/builders/brevBuilder";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import type { MockSetup } from "../../getMockDb";

export const dialogmoteEndretV2Scenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("DIALOGMOTE_ENDRET_V2")
  .withSykmeldt(true)
  .withBrev(
    new BrevBuilder()
      .witUuid("125")
      .withBrevtype("ENDRET")
      .withCreatedAt(leggTilDagerPaDato(new Date(), -4))
      .withTid(leggTilDagerPaDato(new Date(), 60))
      .withDocument(moteinnkallingDocument)
      .build(),
  )
  .build();
