import { Events } from "@/common/amplitude/events";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import DownloadPdfButton from "@/common/components/button/DownloadPdfButton";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import PageHeader from "@/common/components/header/PageHeader";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import HvaSkjerISykefravaeret from "@/common/components/veileder/HvaSkjerISykefravaeret";
import NoReferatAlert from "@/common/components/referat/NoReferatAlert";
import UsefulLinks from "@/common/components/referat/UsefulLinks";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import { useApiBasePath } from "@/common/hooks/routeHooks";
import { useBrevUuid } from "@/common/hooks/useBrevUuid";
import { InfoUrl, Referat } from "@/server/data/types/internal/BrevTypes";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const texts = {
  title: "Referat fra dialogmøte",
};

const infoUrls = (referat: Referat): InfoUrl[] => {
  return referat.document
    .map((documentComponent) => documentComponent.infoUrl)
    .filter((infoUrl): infoUrl is InfoUrl => !!infoUrl);
};

const ReferatPage: NextPage = () => {
  const dialogmoteData = useDialogmoteDataSM();
  const brevuuid = useBrevUuid();
  const basePath = useApiBasePath();

  if (dialogmoteData.isError) {
    return <div>Her ble det noe feil</div>;
  }

  if (dialogmoteData.isSuccess) {
    const referat = dialogmoteData.data.referater.find(
      (value) => value.uuid === brevuuid
    );
    const brevurl = `${basePath}/brev/${brevuuid}/pdf`;

    if (!referat) {
      return <NoReferatAlert />;
    }

    return (
      <>
        <Head>
          <title>{texts.title}</title>
        </Head>
        <PageHeader title={texts.title} />

        <DialogmotePanel>
          <DocumentContainer
            document={referat.document}
            brevUuid={referat.uuid}
          />
        </DialogmotePanel>

        <DownloadPdfButton
          trackingName={Events.LastNedReferat}
          pdfUrl={brevurl}
        />
        <UsefulLinks infoUrls={infoUrls(referat)} />
        <VeilederGuidePanel>
          <HvaSkjerISykefravaeret />
        </VeilederGuidePanel>
        <PersonvernInfo />
      </>
    );
  }
  return <AppSpinner />;
};

export default ReferatPage;
