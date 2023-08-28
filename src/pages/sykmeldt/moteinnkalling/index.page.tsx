import React, { ReactElement } from "react";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <SykmeldtSide title={"Innkalling til Dialogmøte"} hideHeader={true}>
      <MoteinnkallingContent
        isLoading={dialogmoteData.isLoading}
        moteinnkalling={dialogmoteData.data?.moteinnkalling}
      />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Moteinnkalling;
