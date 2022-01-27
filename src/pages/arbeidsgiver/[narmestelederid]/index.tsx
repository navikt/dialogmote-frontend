import InfoTilArbeidsgiver from "@/common/components/referat/InfoTilArbeidsgiver";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import VideoPanel from "@/common/components/video/VideoPanel";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";

const Home: NextPage = () => {
  const narmestelederid = useNarmesteLederId();
  const dialogmoteData = useDialogmoteDataAG(narmestelederid);

  if (dialogmoteData.isError) {
    return <div>Her ble det noe feil</div>;
  }

  if (dialogmoteData.isSuccess) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Dialogmøte AG</title>
        </Head>

        <main className={styles.main}>
          <ReferaterPanel referater={dialogmoteData.data.referater}>
            <InfoTilArbeidsgiver />
          </ReferaterPanel>
          <VideoPanel />
        </main>
      </div>
    );
  }
  return <AppSpinner />;
};

export default Home;
