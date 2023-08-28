import React, { ReactElement } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <ArbeidsgiverSide title="Innkalling til Dialogmøte" hideHeader={true}>
      <MoteinnkallingContent
        isLoading={dialogmoteData.isLoading}
        moteinnkalling={dialogmoteData.data?.moteinnkalling}
      />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Moteinnkalling;
