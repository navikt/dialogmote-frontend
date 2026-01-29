import type { ReactElement } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";

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

export default Moteinnkalling;
