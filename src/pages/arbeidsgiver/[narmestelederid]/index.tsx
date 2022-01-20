import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { useBrevAG } from "@/common/api/queries/arbeidsgiver/brevQueriesAG";
import { useMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import { useSykmeldtAG } from "@/common/api/queries/arbeidsgiver/sykmeldtQueriesAG";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import VideoPanel from "@/common/components/video/VideoPanel";

const Home: NextPage = () => {
  const narmestelederid = useNarmesteLederId();
  const sykmeldt = useSykmeldtAG(narmestelederid);
  const brev = useBrevAG(sykmeldt.data?.fnr);
  const motebehov = useMotebehovAG(
    sykmeldt.data?.fnr,
    sykmeldt.data?.orgnummer
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Dialogmøte AG</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>AG!</h1>
        <VideoPanel />
      </main>
    </div>
  );
};

export default Home;
