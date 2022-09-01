import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import type { NextPage } from "next";
import React from "react";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { ReferatContent } from "@/common/components/referat/ReferatContent";

const texts = {
  title: "Referat fra dialogmøte",
};

const ReferatPage: NextPage = () => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <DialogmotePage
      title={texts.title}
      hideTitle={true}
      isLoading={dialogmoteData.isLoading}
    >
      <ReferatContent dialogmoteData={dialogmoteData} />
    </DialogmotePage>
  );
};

export default ReferatPage;
