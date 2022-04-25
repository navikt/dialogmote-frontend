import {
  BrevDocumentComponentKeyDTO,
  BrevDocumentComponentTypeDTO,
  BrevDTO,
} from "@/server/service/schema/brevSchema";

export type Brev = BrevDTO;

type InfoUrl = {
  key: BrevDocumentComponentKeyDTO;
  text: string;
  url: string;
};

type ReferatDocumentComponent = {
  type: BrevDocumentComponentTypeDTO;
  infoUrl?: InfoUrl;
  title?: string;
  texts: string[];
};

export interface Referat {
  uuid: string;
  createdAt: string;
  tid: string;
  lestDato?: string;
  endring?: boolean;
  document: ReferatDocumentComponent[];
}
