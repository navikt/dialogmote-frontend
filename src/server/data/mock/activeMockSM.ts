import { mockSyfomotebehov } from "@/server/data/mock/motebehov/mockSyfomotebehov";
import { MockDataBuilder } from "@/server/data/mock/mockDataBuilder";
import { mockReferat } from "@/server/data/mock/brev/referatMock";
import { mockMoteinnkalling } from "@/server/data/mock/brev/moteinnkallingMock";

const activeMockSM = new MockDataBuilder()
  .withIsSykmeldt(true)
  .withBrev(
    mockReferat("123-234", new Date(2021, 5, 10), [
      "OKONOMISK_STOTTE",
      "AVKLARING_ARBEIDSEVNE",
      "FRISKMELDING_ARBEIDSFORMIDLING",
    ])
  )
  .withBrev(
    mockReferat("345-555", new Date(2019, 11, 16), ["OKONOMISK_STOTTE"])
  )
  .withBrev(mockMoteinnkalling("INNKALT", "9999", new Date(2022, 10, 4)))
  .withMotebehov(mockSyfomotebehov("SVAR_BEHOV", true))
  .build();

export default activeMockSM;
