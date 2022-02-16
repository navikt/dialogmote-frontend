import {
  DocumentComponentKey,
  DocumentComponentType,
} from "@/server/data/types/external/BrevTypes";

export interface Referat {
  uuid: string;
  tid: string;
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
