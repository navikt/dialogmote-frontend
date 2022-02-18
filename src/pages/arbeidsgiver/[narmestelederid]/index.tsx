import React from "react";
import PageHeader from "@/common/components/PageHeader";
import PersonvernInfo from "@/common/components/PersonvernInfo";
import InfoTilArbeidsgiver from "@/common/components/referat/InfoTilArbeidsgiver";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import VideoPanel from "@/common/components/video/VideoPanel";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import type { NextPage } from "next";
import Head from "next/head";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";

const texts = {
  title: "Dialogmøter",
};

const Home: NextPage = () => {
  const narmestelederid = useNarmesteLederId();
  const dialogmoteData = useDialogmoteDataAG(narmestelederid);

  if (dialogmoteData.isError) {
    return <div>Her ble det noe feil</div>;
  }

  if (dialogmoteData.isSuccess) {
    return (
      <>
        <Head>
          <title>Dialogmøte AG</title>
        </Head>

        <PageHeader title={texts.title} />
        <MoteinnkallingPanel
          moteinnkalling={dialogmoteData.data.moteinnkalling}
        />
        <ReferaterPanel referater={dialogmoteData.data.referater}>
          <InfoTilArbeidsgiver />
        </ReferaterPanel>
        <VideoPanel />
        <PersonvernInfo />
      </>
    );
  }
  return <AppSpinner />;
};

export default Home;
