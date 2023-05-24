import { DocumentComponent } from "types/client/brev";
import { Brev } from "types/shared/brev";

export const createDocumentComponent = (
  props?: Partial<DocumentComponent>
): DocumentComponent => {
  return {
    type: "PARAGRAPH",
    title: "TEST_HEADER",
    texts: ["Test_text_1", "Test_text_2"],
    key: "ARBEIDSRETTET_REHABILITERING",
    ...props,
  };
};

export const createInnkallelseBrev = (props?: Partial<Brev>): Brev => {
  return {
    uuid: "brev_uuid",
    deltakerUuid: "deltaker_uuid",
    createdAt: "2019-11-08",
    brevType: "INNKALT",
    digitalt: true,
    fritekst: "Her kommer det en fritekst",
    sted: "sted-felt",
    tid: "2020-11-08",
    videoLink: "videolenke-felt",
    document: [createDocumentComponent(), createDocumentComponent()],
    virksomhetsnummer: "virksomhetsnummer-felt",
    lestDato: null,
    svar: null,
    ...props,
  };
};
