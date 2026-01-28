import type { BrevDocumentComponentKeyDTO } from "@/server/service/schema/brevSchema";

export type InfoUrl = {
  key: BrevDocumentComponentKeyDTO;
  text: string;
  url: string;
};
