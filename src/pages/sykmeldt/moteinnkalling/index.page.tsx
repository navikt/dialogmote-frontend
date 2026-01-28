import React, { ReactElement } from "react";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
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

export default Moteinnkalling;
