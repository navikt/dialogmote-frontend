import React, { ReactElement } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { SkeletonWrapper } from "@/common/skeleton/SkeletonWrapper";
import ArbeidsgiverSide from "@/common/components/wrappers/ArbeidsgiverSide";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <ArbeidsgiverSide title="Innkalling til Dialogmøte" hideHeader={true}>
      <SkeletonWrapper
        displaySkeleton={dialogmoteData.isLoading}
        skeletonProps={{ height: "75rem" }}
      >
        <MoteinnkallingContent
          moteinnkalling={dialogmoteData.data?.moteinnkalling}
        />
      </SkeletonWrapper>
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Moteinnkalling;
