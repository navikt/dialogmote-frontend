import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import type { NextPage } from "next";
import React from "react";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { ReferatContent } from "@/common/components/referat/ReferatContent";

const texts = {
  title: "Referat fra dialogmøte",
};

const ReferatPage: NextPage = () => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <DialogmotePage
      title={texts.title}
      hideTitle={true}
      sykmeldt={dialogmoteData.data?.sykmeldt}
      withAGHeader
      isLoading={dialogmoteData.isLoading}
    >
      <ReferatContent dialogmoteData={dialogmoteData} />
    </DialogmotePage>
  );
};

export default ReferatPage;
