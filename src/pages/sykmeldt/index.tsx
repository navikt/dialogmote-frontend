import React from "react";
import type { NextPage } from "next";
import { UseQueryResult } from "@tanstack/react-query";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { DialogmoteData } from "types/shared/dialogmote";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import { MotebehovPanelSM } from "@/common/components/motebehov/panel/MotebehovPanelSM";

const texts = {
  title: "Dialogmøter",
  text1:
    "Ønsker du å snakke med NAV om sykepenger eller noe annet enn det vi skal snakke om i et dialogmøte, kan du ",
  text2: "kontakte oss på andre måter.",
};

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const Content = ({ dialogmoteData }: Props) => {
  if (dialogmoteData.isSuccess) {
    return (
      <>
        <MotebehovPanelSM motebehov={dialogmoteData.data.motebehov} />
        <MoteinnkallingPanel
          moteinnkalling={dialogmoteData.data.moteinnkalling}
        />
        <ReferaterPanel referater={dialogmoteData.data.referater} />
      </>
    );
  }
  return null;
};

const Home: NextPage = () => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <PageContainer header={false}>
      <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
        <Content dialogmoteData={dialogmoteData} />

        <VideoPanel />
      </DialogmotePage>
    </PageContainer>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
