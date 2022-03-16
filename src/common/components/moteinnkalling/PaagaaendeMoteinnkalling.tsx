import { isDateInPast } from "@/common/utils/dateUtils";
import { Alert, GuidePanel } from "@navikt/ds-react";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import VeilederInnkallelseContent from "@/common/components/moteinnkalling/VeilederInnkallelseContent";
import React from "react";
import { Brev } from "@/server/data/types/external/BrevTypes";
import DittSvarPaInnkallelse from "@/common/components/moteinnkalling/DittSvarPaInnkallelse";
import GiSvarPaInnkallelse from "@/common/components/moteinnkalling/GiSvarPaInnkallelse";

interface Props {
  moteinnkalling: Brev;
}

const texts = {
  pastDateAlertBox: "Denne innkallingen er utdatert.",
};

export const PaagaaendeMoteinnkalling = ({ moteinnkalling }: Props) => {
  return (
    <>
      {isDateInPast(moteinnkalling.tid) && (
        <Alert variant="warning">{texts.pastDateAlertBox}</Alert>
      )}

      <DocumentContainer
        document={moteinnkalling.document}
        brevUuid={moteinnkalling.uuid}
        lestDato={moteinnkalling.lestDato}
      />

      {moteinnkalling.svar?.svarType ? (
        <DittSvarPaInnkallelse svarType={moteinnkalling.svar?.svarType} />
      ) : (
        <GiSvarPaInnkallelse brevUuid={moteinnkalling.uuid} />
      )}

      {moteinnkalling.videoLink && (
        <GuidePanel>
          <VeilederInnkallelseContent />
        </GuidePanel>
      )}
    </>
  );
};
