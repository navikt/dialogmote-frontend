import VeilederLandingContent from "@/arbeidsgiver/components/VeilederLandingContent";
import VeilederSpeechBubble from "@/components/VeilederSpeechBubble";
import DialogmoteContainer from "@/containers/DialogmoteContainer";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dialogmøte AG</title>
      </Head>

      <main>
        <DialogmoteContainer title="Dialogmøter">
          <VeilederSpeechBubble content={<VeilederLandingContent />} />
        </DialogmoteContainer>
      </main>
    </div>
  );
};

export default Home;
