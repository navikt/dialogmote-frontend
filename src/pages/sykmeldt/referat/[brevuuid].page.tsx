import type { NextPage } from "next";
import React from "react";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import { ReferatContent } from "@/common/components/referat/ReferatContent";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

const texts = {
  title: "Referat fra dialogmøte",
};

const ReferatPage: NextPage = () => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <SykmeldtSide title={texts.title} hideHeader={true}>
      <ReferatContent dialogmoteData={dialogmoteData} />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default ReferatPage;
