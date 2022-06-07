import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import MoteinnkallingPanelB from "@/common/components/moteinnkalling/MoteinnkallingPanelAbTest/MoteinnkallingPanelB";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import InfoOmDialogmote from "@/common/components/veileder/InfoOmDialogmoter";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import type { NextPage } from "next";
import React from "react";
import { MotebehovHarSvartPanel } from "@/common/components/motebehov/MotebehovHarSvartPanel";
import MotebehovHarIkkeSvartPanel from "@/common/components/motebehov/MotebehovHarIkkeSvartPanel";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { UseQueryResult } from "react-query";
import { DialogmoteData } from "types/shared/dialogmote";
import { getRandomVariantBasedOnDate } from "@/common/utils";
import MoteinnkallingPanelA from "@/common/components/moteinnkalling/MoteinnkallingPanelAbTest/MoteinnkallingPanelA";
import { Brev } from "types/shared/brev";

const texts = {
  title: "Dialogmøter",
  infoOmDialogmoter:
    "I et dialogmøte oppsummerer vi hva som har skjedd mens du har vært sykmeldt, og vi planlegger veien videre. De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg.",
};

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

const MoteinnkallingPanel = ({ moteinnkalling }: { moteinnkalling?: Brev }) => {
  const secondVariant = getRandomVariantBasedOnDate(moteinnkalling?.createdAt);

  return secondVariant ? (
    <MoteinnkallingPanelB moteinnkalling={moteinnkalling} />
  ) : (
    <MoteinnkallingPanelA moteinnkalling={moteinnkalling} />
  );
};

const Content = ({ dialogmoteData }: Props) => {
  if (dialogmoteData.isSuccess) {
    return (
      <>
        <MotebehovHarIkkeSvartPanel motebehov={dialogmoteData.data.motebehov} />

        <MotebehovHarSvartPanel motebehov={dialogmoteData.data.motebehov} />

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
    <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
      <VeilederGuidePanel>
        <InfoOmDialogmote>{texts.infoOmDialogmoter}</InfoOmDialogmote>
      </VeilederGuidePanel>

      <Content dialogmoteData={dialogmoteData} />

      <VideoPanel />
    </DialogmotePage>
  );
};

export default Home;
