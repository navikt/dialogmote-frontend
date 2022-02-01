export type DocumentComponentType = "HEADER" | "PARAGRAPH" | "LINK";

export type SvarType = "KOMMER" | "NYTT_TID_STED" | "KOMMER_IKKE";

export type BrevType = "INNKALT" | "AVLYST" | "NYTT_TID_STED" | "REFERAT";

export interface Brev {
  uuid: string;
  deltakerUuid: string;
  createdAt: string;
  brevType: BrevType;
  digitalt: boolean;
  lestDato?: string;
  fritekst: string;
  sted: string;
  tid: string;
  videoLink?: string;
  document: DocumentComponent[];
  virksomhetsnummer: string;
  svar?: Svar;
}

export type DocumentComponent = {
  type: DocumentComponentType;
  key?: string;
  title?: string;
  texts: string[];
};

export type Svar = {
  svarTidspunkt: string;
  svarType: SvarType;
  svarTekst?: string;
};

export type SvarRespons = {
  svarType: SvarType;
  svarTekst?: string;
};
