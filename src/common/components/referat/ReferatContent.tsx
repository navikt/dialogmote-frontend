import { UseQueryResult } from "react-query";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { useBrevUuid } from "@/common/hooks/useBrevUuid";
import { usePdfPath } from "@/common/hooks/routeHooks";
import NoReferatAlert from "@/common/components/referat/NoReferatAlert";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import DownloadPdfButton from "@/common/components/button/DownloadPdfButton";
import { Events } from "@/common/amplitude/events";
import UsefulLinks from "@/common/components/referat/UsefulLinks";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import HvaSkjerISykefravaeret from "@/common/components/veileder/HvaSkjerISykefravaeret";
import React from "react";

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

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
        <DialogmotePanel>
          <DocumentContainer
            document={referat.document}
            brevUuid={referat.uuid}
          />
        </DialogmotePanel>

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
