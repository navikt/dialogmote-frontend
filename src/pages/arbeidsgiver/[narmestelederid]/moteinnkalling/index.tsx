import React, { ReactElement } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <MoteinnkallingContent dialogmoteData={dialogmoteData} userType="AG" />
  );
};

export default Moteinnkalling;
