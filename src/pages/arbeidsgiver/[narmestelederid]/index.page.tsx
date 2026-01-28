import { Skeleton } from "@navikt/ds-react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { NextPage } from "next";
import type { DialogmoteData } from "types/shared/dialogmote";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { MotebehovPanelAG } from "@/common/components/motebehov/panel/MotebehovPanelAG";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import InfoTilArbeidsgiver from "@/common/components/referat/InfoTilArbeidsgiver";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import VideoPanel from "@/common/components/video/VideoPanel";

const texts = {
  title: "Dialogmøter",
  infoOmDialogmoter:
    "I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, arbeidstakeren og en veileder fra Nav-kontoret, eventuelt også den som sykmelder arbeidstakeren.",
};

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const Content = ({ dialogmoteData }: Props) => {
  if (dialogmoteData.isLoading) {
    return (
      <Skeleton
        className="mb-8"
        variant="rectangle"
        width="100%"
        height="14rem"
      />
    );
  }

  return (
    <>
      <MotebehovPanelAG motebehov={dialogmoteData.data?.motebehov} />
      <MoteinnkallingPanel
        moteinnkalling={dialogmoteData.data?.moteinnkalling}
      />
      <ReferaterPanel referater={dialogmoteData.data?.referater}>
        <InfoTilArbeidsgiver />
      </ReferaterPanel>
    </>
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

export default Home;
