import { mapReferater } from "@/server/data/common/mapReferater";
import type { BrevDTO } from "@/server/service/schema/brevSchema";

export const mapBrevData = (brevArray?: BrevDTO[]) => {
  const brevArraySorted = brevArray?.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
  );
  const latestBrev = brevArraySorted
    ? brevArraySorted.filter((value) => value.brevType !== "REFERAT_ENDRET")[0]
    : undefined;

  return {
    latestBrev,
    isLatestBrevReferat:
      latestBrev?.brevType === "REFERAT" ||
      latestBrev?.brevType === "REFERAT_ENDRET",
    isLatestBrevOngoingMoteinnkalling:
      latestBrev?.brevType === "INNKALT" ||
      latestBrev?.brevType === "NYTT_TID_STED",
    referater: mapReferater(brevArraySorted),
  };
};
