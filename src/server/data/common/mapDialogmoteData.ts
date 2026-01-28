import type { DialogmoteData } from "types/shared/dialogmote";
import { mapMotebehov } from "@/server/data/common/mapMotebehov";
import { mapReferater } from "@/server/data/common/mapReferater";
import type { BrevDTO } from "@/server/service/schema/brevSchema";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import type { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";

export const mapDialogmoteData = (
  motebehovStatus: MotebehovStatusDTO,
  brevArray?: BrevDTO[],
  sykmeldt?: SykmeldtDTO,
): DialogmoteData => {
  const brevArraySorted = brevArray?.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
  );
  const latestBrev = brevArraySorted
    ? brevArraySorted.filter((value) => value.brevType !== "REFERAT_ENDRET")[0]
    : undefined;
  const isLastestBrevReferat =
    latestBrev?.brevType === "REFERAT" ||
    latestBrev?.brevType === "REFERAT_ENDRET";
  const isLatestBrevOngoingMoteinnkalling =
    latestBrev?.brevType === "INNKALT" ||
    latestBrev?.brevType === "NYTT_TID_STED";

  return {
    motebehov: mapMotebehov(motebehovStatus, isLatestBrevOngoingMoteinnkalling),
    moteinnkalling: !isLastestBrevReferat ? latestBrev : undefined,
    referater: mapReferater(brevArraySorted),
    sykmeldt: sykmeldt,
  };
};
