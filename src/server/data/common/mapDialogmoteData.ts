import { infoUrls } from "@/common/constants/InfoUrls";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { DialogmoteBaseData } from "@/server/data/types/internal/DialogmoteType";

export const mapDialogmoteData = (
  motebehov: MotebehovStatus,
  brevArray?: Brev[]
): DialogmoteBaseData => {
  const brevArraySorted = brevArray?.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );
  const latestBrev = brevArraySorted ? brevArraySorted[0] : undefined;
  const isLastestBrevReferat = latestBrev?.brevType === "REFERAT";
  const isLatestBrevOngoingMoteinnkalling =
    latestBrev?.brevType === "INNKALT" ||
    latestBrev?.brevType === "NYTT_TID_STED";

  const displayMotebehov =
    motebehov.visMotebehov && !isLatestBrevOngoingMoteinnkalling;

  return {
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
    referater:
      brevArraySorted
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
        })) || [],
  };
};
