import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();

  return <MoteinnkallingContent dialogmoteData={dialogmoteData} />;
};

export default Moteinnkalling;
