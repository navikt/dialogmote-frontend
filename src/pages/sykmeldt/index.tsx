import PageHeader from "@/common/components/PageHeader";
import PersonvernInfo from "@/common/components/PersonvernInfo";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import VideoPanel from "@/common/components/video/VideoPanel";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";

const texts = {
  title: "Dialogmøter",
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
