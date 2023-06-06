import { BrevDTO } from "@/server/service/schema/brevSchema";

export const createBrevDTO = (props?: Partial<BrevDTO>): BrevDTO => {
  return {
    uuid: "",
    deltakerUuid: "",
    createdAt: "2023-06-06",
    brevType: "INNKALT",
    lestDato: null,
    fritekst: "",
    sted: "",
    tid: "",
    videoLink: null,
    document: [],
    virksomhetsnummer: "",
    svar: null,
    ...props,
  };
};
