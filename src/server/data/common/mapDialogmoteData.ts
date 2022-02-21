import { Brev } from "@/server/data/types/external/BrevTypes";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { mapDialogmotebehov } from "@/server/data/common/mapDialogmotebehov";
import { mapReferater } from "@/server/data/common/mapReferater";

export const mapDialogmoteData = (
  isSykmeldt: boolean,
  motebehov: MotebehovStatus,
  brevArray?: Brev[]
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
    isSykmeldt: isSykmeldt,
    motebehov: mapDialogmotebehov(motebehov, isLatestBrevOngoingMoteinnkalling),
    moteinnkalling: !isLastestBrevReferat ? latestBrev : undefined,
    referater: mapReferater(brevArraySorted),
  };
};
