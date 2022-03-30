import {
  DocumentComponentKey,
  DocumentComponentType,
} from "@/server/data/types/external/BrevTypes";

export interface Referat {
  uuid: string;
  createdAt: string;
  tid: string;
  lestDato?: string;
  endring?: boolean;
  document: DocumentComponent[];
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
