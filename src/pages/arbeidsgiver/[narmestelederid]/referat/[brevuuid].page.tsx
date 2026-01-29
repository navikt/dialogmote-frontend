import type { NextPage } from "next";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";
import { ReferatContent } from "@/common/components/referat/ReferatContent";

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
