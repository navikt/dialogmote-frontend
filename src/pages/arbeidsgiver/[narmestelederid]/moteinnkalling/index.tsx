import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import { getAgSideMenuHeader } from "@/common/utils/arbeidsgiverSideMenu";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <PageContainer header={getAgSideMenuHeader(dialogmoteData.data)}>
      <MoteinnkallingContent dialogmoteData={dialogmoteData} />
    </PageContainer>
  );
};

export default Moteinnkalling;
