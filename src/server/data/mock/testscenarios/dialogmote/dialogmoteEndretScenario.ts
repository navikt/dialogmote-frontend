import { leggTilDagerPaDato } from "@/common/utils/dateUtils";
import { moteinnkallingDocument } from "@/server/data/mock/brev/moteinnkallingDocument";
import {
  endretReferatDocument,
  referatDocument,
} from "@/server/data/mock/brev/referatDocument";
import { BrevBuilder } from "@/server/data/mock/builders/brevBuilder";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import type { MockSetup } from "../../getMockDb";

export const dialogmoteEndretScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("DIALOGMOTE_ENDRET")
  .withSykmeldt(true)
  .withBrev(
    new BrevBuilder()
      .witUuid("123")
      .withBrevtype("REFERAT")
      .withCreatedAt(new Date(2021, 3, 3))
      .withTid(new Date(2021, 3, 3))
      .withDocument(referatDocument)
      .build(),
  )
  .withBrev(
    new BrevBuilder()
      .witUuid("124")
      .withBrevtype("REFERAT_ENDRET")
      .withCreatedAt(new Date(2021, 3, 4))
      .withTid(new Date(2021, 3, 3))
      .withDocument(endretReferatDocument)
      .build(),
  )
  .withBrev(
    new BrevBuilder()
      .witUuid("125")
      .withBrevtype("NYTT_TID_STED")
      .withCreatedAt(leggTilDagerPaDato(new Date(), -4))
      .withTid(leggTilDagerPaDato(new Date(), 60))
      .withDocument(moteinnkallingDocument)
      .build(),
  )
  .build();
