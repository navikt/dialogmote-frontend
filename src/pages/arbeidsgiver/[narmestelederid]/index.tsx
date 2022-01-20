import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { useBrevAG } from "@/common/api/queries/arbeidsgiver/brevQueriesAG";
import { useMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import { Brev } from "@/common/api/types/brevTypes";
import { ReactElement } from "react";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { useSykmeldtAG } from "@/common/api/queries/arbeidsgiver/sykmeldtQueriesAG";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import VeilederLandingContent from "@/arbeidsgiver/components/VeilederLandingContent";
import VeilederSpeechBubble from "@/components/VeilederSpeechBubble";
import DialogmoteContainer from "@/containers/DialogmoteContainer";

const Home: NextPage = () => {
  const narmestelederid = useNarmesteLederId();
  const sykmeldt = useSykmeldtAG(narmestelederid);
  const brev = useBrevAG(sykmeldt.data?.fnr);
  const motebehov = useMotebehovAG(
    sykmeldt.data?.fnr,
    sykmeldt.data?.orgnummer
  );

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Dialogmøte AG</title>
      </Head>

      <main>
        <DialogmoteContainer title="Dialogmøter">
          <VeilederSpeechBubble content={<VeilederLandingContent />} />
          <div>{brev.isSuccess && renderBrev(brev.data)}</div>
          <div>{motebehov.isSuccess && renderMotebehov(motebehov.data)}</div>
        </DialogmoteContainer>
      </main>
    </div>
  );
};

export default Home;
