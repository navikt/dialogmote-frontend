import { Events } from "@/common/amplitude/events";
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
import { SkeletonWrapper } from "@/common/skeleton/SkeletonWrapper";

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const texts = {
  title: "Referat fra dialogmøte",
};

export const ReferatContent = ({ dialogmoteData }: Props) => {
  const brevuuid = useBrevUuid();
  const pdfPath = usePdfPath();

  const referat = dialogmoteData.data?.referater.find(
    (value) => value.uuid === brevuuid
  );

  if (dialogmoteData.isSuccess && !referat) {
    return <NoReferatAlert />;
  }

  return (
    <SkeletonWrapper
      displaySkeleton={dialogmoteData.isLoading}
      skeletonProps={{ height: "75rem" }}
    >
      <DocumentContainer
        title={texts.title}
        document={referat?.document || []}
        lestDato={referat?.lestDato}
        brevUuid={referat?.uuid || "123"}
      />

      <DownloadPdfButton
        trackingName={Events.LastNedReferat}
        pdfUrl={pdfPath}
      />
      <UsefulLinks referat={referat} />
      <KontaktOssVeileder />
    </SkeletonWrapper>
  );
};
