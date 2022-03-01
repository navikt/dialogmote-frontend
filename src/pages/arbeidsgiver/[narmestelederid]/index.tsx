import React from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import MotebehovPanel from "@/common/components/motebehov/MotebehovPanel";
import PageHeader from "@/common/components/header/PageHeader";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import InfoTilArbeidsgiver from "@/common/components/referat/InfoTilArbeidsgiver";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import InfoOmDialogmote from "@/common/components/veileder/InfoOmDialogmoter";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import type { NextPage } from "next";

const texts = {
  title: "Dialogmøter",
  infoOmDialogmoter:
    "I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, arbeidstakeren og en veileder fra NAV-kontoret, eventuelt også den som sykmelder arbeidstakeren.",
};

const Home: NextPage = () => {
  const dialogmoteData = useDialogmoteDataAG();

  if (dialogmoteData.isError) {
    return <div>Her ble det noe feil</div>;
  }

  if (dialogmoteData.isSuccess) {
    return (
      <>
        <PageHeader title={texts.title} />

        <VeilederGuidePanel>
          <InfoOmDialogmote>{texts.infoOmDialogmoter}</InfoOmDialogmote>
        </VeilederGuidePanel>

        <MotebehovPanel motebehov={dialogmoteData.data.motebehov} />

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
