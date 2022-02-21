import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import MotebehovPanel from "@/common/components/motebehov/MotebehovPanel";
import PageHeader from "@/common/components/PageHeader";
import PersonvernInfo from "@/common/components/PersonvernInfo";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import InfoOmDialogmote from "@/common/components/veileder/InfoOmDialogmoter";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const texts = {
  title: "Dialogmøter",
  infoOmDialogmoter:
    "I et dialogmøte oppsummerer vi hva som har skjedd mens du har vært sykmeldt, og vi planlegger veien videre. De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg.",
};

const Home: NextPage = () => {
  const dialogmoteData = useDialogmoteDataSM();

  if (dialogmoteData.isError) {
    return <div>Her ble det noe feil</div>;
  }

  if (dialogmoteData.isSuccess) {
    return (
      <>
        <Head>
          <title>Dialogmøte SM</title>
        </Head>

        <PageHeader title={texts.title} />

          <MotebehovPanel motebehov={dialogmoteData.data.motebehov} />
          
        <VeilederGuidePanel>
          <InfoOmDialogmote>{texts.infoOmDialogmoter}</InfoOmDialogmote>
        </VeilederGuidePanel>
          
        <MoteinnkallingPanel
          moteinnkalling={dialogmoteData.data.moteinnkalling}
        />
        <ReferaterPanel referater={dialogmoteData.data.referater} />
          
        <VideoPanel />
          
        <PersonvernInfo />
      </>
    );
  }

  return <AppSpinner />;
};

export default Home;
