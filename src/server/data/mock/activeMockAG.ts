import { MockDataBuilder } from "@/server/data/mock/builders/mockDataBuilder";
import { BrevBuilder } from "@/server/data/mock/builders/brevBuilder";
import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";
import { referatDocument } from "@/server/data/mock/brev/referatDocument";
import { anotherReferatDocument } from "@/server/data/mock/brev/anotherReferatDocument";
import { moteinnkallingDocument } from "@/server/data/mock/brev/moteinnkallingDocument";

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
  .withBrev(
    new BrevBuilder()
      .witUuid("999")
      .withBrevtype("INNKALT")
      .withCreatedAt(new Date(2021, 10, 4))
      .withTid(new Date(2022, 4, 4))
      .withDocument(moteinnkallingDocument)
      .build()
  )
  .withMotebehov(
    new MotebehovBuilder()
      .withSkjematype("MELD_BEHOV")
      .withMotebehov({
        aktorId: "123",
        id: "234",
        arbeidstakerFnr: "02020212345",
        opprettetAv: "",
        virksomhetsnummer: "000111222",
        motebehovSvar: {
          harMotebehov: true,
          forklaring:
            "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). Vondt i hodet",
        },
        opprettetDato: "2019-11-08T12:35:37.669+01:00",
      })
      .build()
  )
  .build();

export default activeMockAG;
