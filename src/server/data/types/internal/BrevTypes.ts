import {
  BrevType,
  DocumentComponentKey,
  DocumentComponentType,
  SvarType,
} from "@/server/data/types/external/BrevTypes";

export interface Brev {
  uuid: string;
  brevType: BrevType;
  tid: string;
  document: DocumentComponent[];
  svar?: Svar;
}

export type DocumentComponent = {
  type: DocumentComponentType;
  infoUrl?: InfoUrl;
  title?: string;
  texts: string[];
};

export type InfoUrl = {
  key: DocumentComponentKey;
  text: string;
  url: string;
};

export type Svar = {
  svarType: SvarType;
};
