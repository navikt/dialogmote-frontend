import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <PageContainer header={false}>
      <MoteinnkallingContent dialogmoteData={dialogmoteData} />
    </PageContainer>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Moteinnkalling;
