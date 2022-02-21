import { MockDataBuilder } from "@/server/data/mock/builders/mockDataBuilder";
import { BrevBuilder } from "@/server/data/mock/builders/brevBuilder";
import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";
import { referatDocument } from "@/server/data/mock/brev/referatDocument";
import { anotherReferatDocument } from "@/server/data/mock/brev/anotherReferatDocument";

const activeMockAG = new MockDataBuilder()
  .withSykmeldt(true)
  .withBrev(
    new BrevBuilder()
      .witUuid("777")
      .withBrevtype("REFERAT")
      .withCreatedAt(new Date(2019, 11, 16))
      .withTid(new Date(2019, 12, 11))
      .withDocument(referatDocument)
      .build()
  )
  .withBrev(
    new BrevBuilder()
      .witUuid("888")
      .withBrevtype("REFERAT")
      .withCreatedAt(new Date(2020, 5, 10))
      .withTid(new Date(2021, 3, 3))
      .withDocument(anotherReferatDocument)
      .build()
  )
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("SVAR_BEHOV")
      .build()
  )
  .build();

export default activeMockAG;
