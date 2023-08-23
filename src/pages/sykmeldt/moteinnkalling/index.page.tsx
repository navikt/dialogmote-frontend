import React, { ReactElement } from "react";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { SkeletonWrapper } from "@/common/skeleton/SkeletonWrapper";

const Content = () => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <SkeletonWrapper
      displaySkeleton={dialogmoteData.isLoading}
      skeletonProps={{ height: "75rem" }}
    >
      <MoteinnkallingContent
        moteinnkalling={dialogmoteData.data?.moteinnkalling}
      />
    </SkeletonWrapper>
  );
};

const Moteinnkalling = (): ReactElement => {
  return (
    <DialogmotePage title={"Innkalling til Dialogmøte"} hideHeader={true}>
      <Content />
    </DialogmotePage>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Moteinnkalling;
