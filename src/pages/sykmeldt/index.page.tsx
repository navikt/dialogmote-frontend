import React from "react";
import type { NextPage } from "next";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import InfoOmDialogmote from "@/common/components/veileder/InfoOmDialogmoter";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import MoteinnkallingPanel from "@/common/components/moteinnkalling/MoteinnkallingPanel";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import { BodyLong, Skeleton } from "@navikt/ds-react";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import { MotebehovPanelSM } from "@/common/components/motebehov/panel/MotebehovPanelSM";

const texts = {
  title: "Dialogmøter",
  text1:
    "Ønsker du å snakke med Nav om sykepenger eller noe annet enn det vi skal snakke om i et dialogmøte, kan du ",
  text2: "kontakte oss på andre måter.",
};

const Content = () => {
  const dialogmoteData = useDialogmoteDataSM();

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
      <MotebehovPanelSM motebehov={dialogmoteData.data?.motebehov} />
      <MoteinnkallingPanel
        moteinnkalling={dialogmoteData.data?.moteinnkalling}
      />
      <ReferaterPanel referater={dialogmoteData.data?.referater} />
    </>
  );
};

const Home: NextPage = () => {
  return (
    <SykmeldtSide title={texts.title}>
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
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
