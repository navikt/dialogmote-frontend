import { Brev } from "@/server/data/types/external/BrevTypes";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import { infoUrls } from "@/common/constants/InfoUrls";

export const mapReferater = (brev?: Brev[]): Referat[] => {
  return (
    brev
      ?.filter((brev) => brev.brevType === "REFERAT")
      .map((brev) => ({
        uuid: brev.uuid,
        tid: brev.tid,
        document: brev.document.map((component) => ({
          type: component.type,
          infoUrl: component.key ? infoUrls[component.key] : undefined,
          title: component.title,
          texts: component.texts,
        })),
      })) || []
  );
};
