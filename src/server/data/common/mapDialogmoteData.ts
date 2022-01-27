import { Brev } from "@/server/data/types/external/BrevTypes";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";

export const mapDialogmoteData = (
  brevArray: Brev[],
  motebehov: MotebehovStatus,
  isSykmeldt: boolean
): DialogmoteData => {
  const latestBrev = brevArray[0];
  const isLastestBrevReferat = latestBrev?.brevType === "REFERAT";
  const isLatestBrevOngoingMoteinnkalling =
    latestBrev?.brevType === "INNKALT" ||
    latestBrev?.brevType === "NYTT_TID_STED";

  const displayMotebehov =
    motebehov.visMotebehov && !isLatestBrevOngoingMoteinnkalling;

  return {
    isSykmeldt: isSykmeldt,
    motebehov: displayMotebehov
      ? {
          skjemaType: motebehov.skjemaType,
          svar: {
            harMotebehov: motebehov.motebehov?.motebehovSvar.harMotebehov,
            forklaring: motebehov.motebehov?.motebehovSvar.forklaring,
            opprettetDato: motebehov.motebehov?.opprettetDato,
            virksomhetsnummer: motebehov.motebehov?.virksomhetsnummer,
          },
        }
      : undefined,
    moteinnkalling: !isLastestBrevReferat ? latestBrev : undefined,
    referater: brevArray.filter((brev) => brev.brevType === "REFERAT"),
  };
};
