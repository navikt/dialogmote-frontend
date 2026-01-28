import type { NextPage } from "next";
import React from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { ReferatContent } from "@/common/components/referat/ReferatContent";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";

const texts = {
  title: "Referat fra dialogmøte",
};

const ReferatPage: NextPage = () => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <ArbeidsgiverSide title={texts.title} hideHeader={true}>
      <ReferatContent dialogmoteData={dialogmoteData} />
    </ArbeidsgiverSide>
  );
};

export default ReferatPage;
