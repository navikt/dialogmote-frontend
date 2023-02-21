import { MockSetup } from "../../getMockDb";
import { TestScenarioBuilder } from "@/server/data/mock/builders/testScenarioBuilder";
import { BrevBuilder } from "@/server/data/mock/builders/brevBuilder";
import {
  endretReferatDocument,
  referatDocument,
} from "@/server/data/mock/brev/referatDocument";
import { leggTilDagerPaDato } from "@/common/utils/dateUtils";
import { moteavlystDocument } from "@/server/data/mock/brev/moteAvlystDocument";

export const dialogmoteAvlystScenario: MockSetup = new TestScenarioBuilder()
  .withBrev(
    new BrevBuilder()
      .witUuid("123")
      .withBrevtype("REFERAT")
      .withCreatedAt(new Date(2021, 3, 3))
      .withTid(new Date(2021, 3, 3))
      .withDocument(referatDocument)
      .build()
  )
  .withBrev(
    new BrevBuilder()
      .witUuid("124")
      .withBrevtype("REFERAT_ENDRET")
      .withCreatedAt(new Date(2021, 3, 4))
      .withTid(new Date(2021, 3, 3))
      .withDocument(endretReferatDocument)
      .build()
  )
  .withBrev(
    new BrevBuilder()
      .witUuid("125")
      .withBrevtype("AVLYST")
      .withCreatedAt(leggTilDagerPaDato(new Date(), -7))
      .withTid(leggTilDagerPaDato(new Date(), 40))
      .withDocument(moteavlystDocument)
      .build()
  )
  .build();
