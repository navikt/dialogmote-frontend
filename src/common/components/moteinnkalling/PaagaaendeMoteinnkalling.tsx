import { isDateInPast } from "@/common/utils/dateUtils";
import { Alert, GuidePanel } from "@navikt/ds-react";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import VeilederInnkallelseContent from "@/common/components/moteinnkalling/VeilederInnkallelseContent";
import React from "react";
import DittSvarPaInnkallelse from "@/common/components/moteinnkalling/DittSvarPaInnkallelse";
import GiSvarPaInnkallelseA from "@/common/components/moteinnkalling/GiSvarPaInnkallelseAbTest/GiSvarPaInnkallelseA";
import GiSvarPaInnkallelseB from "@/common/components/moteinnkalling/GiSvarPaInnkallelseAbTest/GiSvarPaInnkallelseB";
import { Brev } from "types/shared/brev";

interface Props {
  moteinnkalling: Brev;
  secondVariant: boolean;
}

const texts = {
  pastDateAlertBox: "Denne innkallingen er utdatert.",
  titleEndring: "Endret dialogmøte",
  titleInnkalling: "Innkalling til dialogmøte",
};

export const PaagaaendeMoteinnkalling = ({
  moteinnkalling,
  secondVariant,
}: Props) => {
  const giSvarPaInnkallelse = () =>
    secondVariant ? (
      <GiSvarPaInnkallelseB brevUuid={moteinnkalling.uuid} />
    ) : (
      <GiSvarPaInnkallelseA brevUuid={moteinnkalling.uuid} />
    );

  return (
    <>
      {isDateInPast(moteinnkalling.tid) && (
        <Alert variant="warning">{texts.pastDateAlertBox}</Alert>
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
        giSvarPaInnkallelse()
      )}

      {moteinnkalling.videoLink && (
        <GuidePanel>
          <VeilederInnkallelseContent />
        </GuidePanel>
      )}
    </>
  );
};
