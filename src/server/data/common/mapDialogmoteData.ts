import { Brev } from "@/server/data/types/external/BrevTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { mapReferater } from "@/server/data/common/mapReferater";
import { ExtMotebehovStatus } from "@/server/data/types/external/ExternalMotebehovTypes";
import { mapMotebehov } from "@/server/data/common/mapMotebehov";
import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";

export const mapDialogmoteData = (
  motebehov: ExtMotebehovStatus,
  brevArray?: Brev[],
  sykmeldt?: Sykmeldt
): DialogmoteData => {
  const brevArraySorted = brevArray?.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );
  const latestBrev = brevArraySorted ? brevArraySorted[0] : undefined;
  const isLastestBrevReferat = latestBrev?.brevType === "REFERAT";
  const isLatestBrevOngoingMoteinnkalling =
    latestBrev?.brevType === "INNKALT" ||
    latestBrev?.brevType === "NYTT_TID_STED";

  return {
    motebehov: mapMotebehov(motebehov, isLatestBrevOngoingMoteinnkalling),
    moteinnkalling: !isLastestBrevReferat ? latestBrev : undefined,
    referater: mapReferater(brevArraySorted),
    sykmeldt: sykmeldt,
  };
};
