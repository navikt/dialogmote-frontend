import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import VideoPanel from "@/common/components/video/VideoPanel";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";

const Home: NextPage = () => {
  const dialogmoteData = useDialogmoteDataSM();

  if (dialogmoteData.isError) {
    return <div>Her ble det noe feil</div>;
  }

  if (dialogmoteData.isSuccess) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Dialogmøte SM</title>
        </Head>

        <main className={styles.main}>
          <ReferaterPanel referater={dialogmoteData.data.referater} />
          <VideoPanel />
        </main>
      </div>
    );
  }

  return <AppSpinner />;
};

export default Home;
