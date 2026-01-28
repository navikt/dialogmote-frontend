import { isDateInPast } from "@/common/utils/dateUtils";
import { GuidePanel, LocalAlert } from "@navikt/ds-react";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import VeilederInnkallelseContent from "@/common/components/moteinnkalling/VeilederInnkallelseContent";
import DittSvarPaInnkallelse from "@/common/components/moteinnkalling/DittSvarPaInnkallelse";
import { Brev } from "types/shared/brev";
import GiSvarPaInnkallelse from "@/common/components/moteinnkalling/GiSvarPaInnkallelse";

interface Props {
  moteinnkalling: Brev;
}

const texts = {
  pastDateAlertBox: "Denne innkallingen er utdatert.",
  titleEndring: "Endret dialogmøte",
  titleInnkalling: "Innkalling til dialogmøte",
};

export const PaagaaendeMoteinnkalling = ({ moteinnkalling }: Props) => (
  <>
    {isDateInPast(moteinnkalling.tid) && (
      <LocalAlert status="warning">
        <LocalAlert.Content>{texts.pastDateAlertBox}</LocalAlert.Content>
      </LocalAlert>
    )}

    <DocumentContainer
      title={
        moteinnkalling.brevType === "INNKALT"
          ? texts.titleInnkalling
          : texts.titleEndring
      }
      document={moteinnkalling.document}
      brevUuid={moteinnkalling.uuid}
      lestDato={moteinnkalling.lestDato}
    />

    {moteinnkalling.svar?.svarType ? (
      <DittSvarPaInnkallelse svarType={moteinnkalling.svar?.svarType} />
    ) : (
      !isDateInPast(moteinnkalling.tid) && (
        <GiSvarPaInnkallelse brevUuid={moteinnkalling.uuid} />
      )
    )}

    {moteinnkalling.videoLink && (
      <GuidePanel>
        <VeilederInnkallelseContent />
      </GuidePanel>
    )}
  </>
);
