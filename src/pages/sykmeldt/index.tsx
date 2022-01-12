import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useBrevSM } from "@/common/api/queries/sykmeldt/brevQueriesSM";
import { useMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { Brev } from "@/common/api/types/brevTypes";
import { ReactElement } from "react";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";

const renderBrev = (brev: Brev[]): ReactElement => {
  return (
    <div>
      {brev.map((b: Brev, i: number) => (
        <div key={i}>Brevtype: {b.brevType}</div>
      ))}
    </div>
  );
};

const renderMotebehov = (motebehov: MotebehovStatus): ReactElement => {
  return <div>Motebehovtype: {motebehov.skjemaType}</div>;
};

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
        <div>{brev.isSuccess && renderBrev(brev.data)}</div>
        <div>{motebehov.isSuccess && renderMotebehov(motebehov.data)}</div>
      </main>
    </div>
  );
};

export default Home;
