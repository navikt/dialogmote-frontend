import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useBrevSM } from "@/common/api/queries/sykmeldt/brevQueriesSM";
import { useMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import VideoPanel from "@/common/components/video/VideoPanel";

const Home: NextPage = () => {
  const brev = useBrevSM();
  const motebehov = useMotebehovSM();

  return (
    <div className={styles.container}>
      <Head>
        <title>Dialogmøte SM</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SM!</h1>
        <VideoPanel />
      </main>
    </div>
  );
};

export default Home;
