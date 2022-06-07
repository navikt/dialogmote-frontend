import {
  BrevDocumentComponentKeyDTO,
  BrevDocumentComponentTypeDTO,
  BrevDTO,
  SvarResponsDTO,
  SvarTypeDTO,
} from "@/server/service/schema/brevSchema";

export type Brev = BrevDTO;

type InfoUrl = {
  key: BrevDocumentComponentKeyDTO;
  text: string;
  url: string;
};

export type ReferatDocumentComponent = {
  type: BrevDocumentComponentTypeDTO;
  infoUrl?: InfoUrl;
  title: string | null;
  texts: string[];
};

export interface Referat {
  uuid: string;
  createdAt: string;
  tid: string;
  lestDato: string | null;
  endring?: boolean;
  document: ReferatDocumentComponent[];
}

export type SvarType = SvarTypeDTO;

export type SvarRespons = SvarResponsDTO;
