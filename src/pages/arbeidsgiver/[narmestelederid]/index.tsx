import React from "react";
import type { NextPage } from "next";
import { UseQueryResult } from "react-query";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import InfoTilArbeidsgiver from "@/common/components/referat/InfoTilArbeidsgiver";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { DialogmoteData } from "types/shared/dialogmote";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import { ArbeidsgiverSideMenu } from "@/common/components/menu/ArbeidsgiverSideMenu";
import {
  getAgSideMenuHeader,
  getSykmeldt,
} from "@/common/utils/arbeidsgiverSideMenu";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { MotebehovPanelAG } from "@/common/components/motebehov/panel/MotebehovPanelAG";

const texts = {
  title: "Dialogmøter",
  infoOmDialogmoter:
    "I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, arbeidstakeren og en veileder fra NAV-kontoret, eventuelt også den som sykmelder arbeidstakeren.",
};

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const Content = ({ dialogmoteData }: Props) => {
  if (dialogmoteData.isSuccess) {
    return (
      <>
        <MotebehovPanelAG motebehov={dialogmoteData.data.motebehov} />
        <MoteinnkallingPanel
          moteinnkalling={dialogmoteData.data.moteinnkalling}
        />
        <ReferaterPanel referater={dialogmoteData.data.referater}>
          <InfoTilArbeidsgiver />
        </ReferaterPanel>
      </>
    );
  }
  return null;
};

const Home: NextPage = () => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <PageContainer
      sykmeldt={getSykmeldt(dialogmoteData.data)}
      header={getAgSideMenuHeader(dialogmoteData.data)}
      navigation={!dialogmoteData.isLoading && <ArbeidsgiverSideMenu />}
    >
      <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
        <Content dialogmoteData={dialogmoteData} />
        <VideoPanel />
      </DialogmotePage>
    </PageContainer>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
