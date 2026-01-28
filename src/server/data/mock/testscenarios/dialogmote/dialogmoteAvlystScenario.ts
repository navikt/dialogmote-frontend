import { leggTilDagerPaDato } from "@/common/utils/dateUtils";
import { moteavlystDocument } from "@/server/data/mock/brev/moteAvlystDocument";
import {
  endretReferatDocument,
  referatDocument,
} from "@/server/data/mock/brev/referatDocument";
import { BrevBuilder } from "@/server/data/mock/builders/brevBuilder";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import type { MockSetup } from "../../getMockDb";

export const dialogmoteAvlystScenario: MockSetup = new TestScenarioBuilder()
  .withTestScenario("DIALOGMOTE_AVLYST")
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
      .withBrevtype("AVLYST")
      .withCreatedAt(leggTilDagerPaDato(new Date(), -7))
      .withTid(leggTilDagerPaDato(new Date(), 40))
      .withDocument(moteavlystDocument)
      .build(),
  )
  .build();
