import { Events } from "@/common/amplitude/events";
import DownloadPdfButton from "@/common/components/button/DownloadPdfButton";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import NoReferatAlert from "@/common/components/referat/NoReferatAlert";
import UsefulLinks from "@/common/components/referat/UsefulLinks";
import HvaSkjerISykefravaeret from "@/common/components/veileder/HvaSkjerISykefravaeret";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import { usePdfPath } from "@/common/hooks/routeHooks";
import { useBrevUuid } from "@/common/hooks/useBrevUuid";
import React from "react";
import { UseQueryResult } from "react-query";
import { DialogmoteData } from "types/shared/dialogmote";

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const texts = {
  title: "Referat fra dialogmøte",
};

export const ReferatContent = ({ dialogmoteData }: Props) => {
  const brevuuid = useBrevUuid();
  const pdfPath = usePdfPath();

  if (dialogmoteData.isSuccess) {
    const referat = dialogmoteData.data.referater.find(
      (value) => value.uuid === brevuuid
    );
    if (!referat) {
      return <NoReferatAlert />;
    }

    return (
      <>
        <DocumentContainer
          title={texts.title}
          document={referat.document}
          brevUuid={referat.uuid}
        />

        <DownloadPdfButton
          trackingName={Events.LastNedReferat}
          pdfUrl={pdfPath}
        />
        <UsefulLinks referat={referat} />
        <VeilederGuidePanel>
          <HvaSkjerISykefravaeret />
        </VeilederGuidePanel>
      </>
    );
  }
  return null;
};
