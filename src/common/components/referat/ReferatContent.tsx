import { Events } from "@/common/analytics/events";
import DownloadPdfButton from "@/common/components/button/DownloadPdfButton";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import NoReferatAlert from "@/common/components/referat/NoReferatAlert";
import UsefulLinks from "@/common/components/referat/UsefulLinks";
import KontaktOssVeileder from "@/common/components/veileder/KontaktOssVeileder";
import { usePdfPath } from "@/common/hooks/routeHooks";
import { useBrevUuid } from "@/common/hooks/useBrevUuid";
import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { DialogmoteData } from "types/shared/dialogmote";
import { Skeleton } from "@navikt/ds-react";

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const texts = {
  title: "Referat fra dialogmøte",
};

export const ReferatContent = ({ dialogmoteData }: Props) => {
  const brevuuid = useBrevUuid();
  const pdfPath = usePdfPath();

  if (dialogmoteData.isLoading) {
    return <Skeleton variant="rectangle" width="100%" height="75rem" />;
  }

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
          lestDato={referat.lestDato}
          brevUuid={referat.uuid}
        />

        <DownloadPdfButton
          trackingName={Events.LastNedReferat}
          pdfUrl={pdfPath}
        />
        <UsefulLinks referat={referat} />
        <KontaktOssVeileder />
      </>
    );
  }

  return null;
};
