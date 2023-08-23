import React from "react";
import type { NextPage } from "next";
import { UseQueryResult } from "@tanstack/react-query";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import InfoTilArbeidsgiver from "@/common/components/referat/InfoTilArbeidsgiver";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import { DialogmoteData } from "types/shared/dialogmote";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { MotebehovPanelAG } from "@/common/components/motebehov/panel/MotebehovPanelAG";
import { SkeletonWrapper } from "@/common/skeleton/SkeletonWrapper";
import ArbeidsgiverSide from "@/common/components/wrappers/ArbeidsgiverSide";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";

const texts = {
  title: "Dialogmøter",
  infoOmDialogmoter:
    "I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, arbeidstakeren og en veileder fra NAV-kontoret, eventuelt også den som sykmelder arbeidstakeren.",
};

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const Content = ({ dialogmoteData }: Props) => {
  return (
    <SkeletonWrapper
      displaySkeleton={dialogmoteData.isLoading}
      skeletonProps={{ height: "14rem" }}
    >
      <MotebehovPanelAG motebehov={dialogmoteData.data?.motebehov} />
      <MoteinnkallingPanel
        moteinnkalling={dialogmoteData.data?.moteinnkalling}
      />
      <ReferaterPanel referater={dialogmoteData.data?.referater}>
        <InfoTilArbeidsgiver />
      </ReferaterPanel>
    </SkeletonWrapper>
  );
};

const Home: NextPage = () => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <ArbeidsgiverSide title={texts.title}>
      <Content dialogmoteData={dialogmoteData} />
      <VideoPanel />
      <PersonvernInfo />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
