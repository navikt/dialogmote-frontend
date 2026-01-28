import type { Referat } from "types/shared/brev";
import { infoUrls } from "@/common/constants/InfoUrls";
import type { BrevDTO } from "@/server/service/schema/brevSchema";

export const mapReferater = (brev?: BrevDTO[]): Referat[] => {
  return (
    brev
      ?.filter(
        (brev) =>
          brev.brevType === "REFERAT" || brev.brevType === "REFERAT_ENDRET",
      )
      .map((brev) => ({
        uuid: brev.uuid,
        createdAt: brev.createdAt,
        tid: brev.tid,
        lestDato: brev.lestDato,
        endring: brev.brevType === "REFERAT_ENDRET",
        document: brev.document.map((component) => ({
          type: component.type,
          infoUrl: component.key ? infoUrls[component.key] : undefined,
          title: component.title,
          texts: component.texts,
        })),
      })) || []
  );
};
