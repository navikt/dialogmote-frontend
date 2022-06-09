import { isDateInPast } from "@/common/utils/dateUtils";
import { Alert, GuidePanel } from "@navikt/ds-react";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import VeilederInnkallelseContent from "@/common/components/moteinnkalling/VeilederInnkallelseContent";
import React from "react";
import DittSvarPaInnkallelse from "@/common/components/moteinnkalling/DittSvarPaInnkallelse";
import { Brev } from "types/shared/brev";
import GiSvarPaInnkallelse from "@/common/components/moteinnkalling/GiSvarPaInnkallelse";
import { getRandomVariantBasedOnDate } from "@/common/utils";

interface Props {
  moteinnkalling: Brev;
}

const texts = {
  pastDateAlertBox: "Denne innkallingen er utdatert.",
  titleEndring: "Endret dialogmøte",
  titleInnkalling: "Innkalling til dialogmøte",
};

export const PaagaaendeMoteinnkalling = ({ moteinnkalling }: Props) => {
  const variant = getRandomVariantBasedOnDate(moteinnkalling.createdAt)
    ? "B"
    : "A";

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
        !isDateInPast(moteinnkalling.tid) && (
          <GiSvarPaInnkallelse
            brevUuid={moteinnkalling.uuid}
            variant={variant}
          />
        )
      )}

      {moteinnkalling.videoLink && (
        <GuidePanel>
          <VeilederInnkallelseContent />
        </GuidePanel>
      )}
    </>
  );
};
