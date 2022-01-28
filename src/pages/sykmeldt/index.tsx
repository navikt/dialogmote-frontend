import { useBrevSM } from "@/common/api/queries/sykmeldt/brevQueriesSM";
import { useMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import PageHeader from "@/common/components/PageHeader";
import PersonvernInfo from "@/common/components/PersonvernInfo";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  const brev = useBrevSM();
  const motebehov = useMotebehovSM();

  if (brev.isError) {
    return <div>Her ble det noe feil</div>;
  }

  if (brev.isSuccess) {
    const referater = brev.data.filter(
      (hendelse) => hendelse.brevType === "REFERAT"
    );

    return (
      <>
        <Head>
          <title>Dialogmøte SM</title>
        </Head>

        <PageHeader title="Dialogmøter" />
        <ReferaterPanel referater={referater} />
        <VideoPanel />
        <PersonvernInfo />
      </>
    );
  }

  return <div>Vis en loading-animasjon her..</div>;
};

export default Home;
