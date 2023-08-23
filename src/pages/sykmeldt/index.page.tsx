import React from "react";
import type { NextPage } from "next";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import InfoOmDialogmote from "@/common/components/veileder/InfoOmDialogmoter";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import { BodyLong } from "@navikt/ds-react";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import { MotebehovPanelSM } from "@/common/components/motebehov/panel/MotebehovPanelSM";
import { SkeletonWrapper } from "@/common/skeleton/SkeletonWrapper";

const texts = {
  title: "Dialogmøter",
  text1:
    "Ønsker du å snakke med NAV om sykepenger eller noe annet enn det vi skal snakke om i et dialogmøte, kan du ",
  text2: "kontakte oss på andre måter.",
};

const Content = () => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <SkeletonWrapper
      displaySkeleton={dialogmoteData.isLoading}
      skeletonProps={{ height: "14rem" }}
    >
      <MotebehovPanelSM motebehov={dialogmoteData.data?.motebehov} />
      <MoteinnkallingPanel
        moteinnkalling={dialogmoteData.data?.moteinnkalling}
      />
      <ReferaterPanel referater={dialogmoteData.data?.referater} />
    </SkeletonWrapper>
  );
};

const Home: NextPage = () => {
  return (
    <DialogmotePage title={texts.title}>
      <Content />

      <VeilederGuidePanel>
        <InfoOmDialogmote>
          <BodyLong spacing>
            {texts.text1}
            <KontaktOssLink linkText={texts.text2} />
          </BodyLong>
        </InfoOmDialogmote>
      </VeilederGuidePanel>

      <VideoPanel />
    </DialogmotePage>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
