import type { NextPage } from "next";
import React from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { ReferatContent } from "@/common/components/referat/ReferatContent";
import { getAgSideMenuHeader } from "@/common/utils/arbeidsgiverSideMenu";

const texts = {
  title: "Referat fra dialogmøte",
};

const ReferatPage: NextPage = () => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <PageContainer header={getAgSideMenuHeader(dialogmoteData.data)}>
      <DialogmotePage
        title={texts.title}
        hideHeader={true}
        isLoading={dialogmoteData.isLoading}
      >
        <ReferatContent dialogmoteData={dialogmoteData} />
      </DialogmotePage>
    </PageContainer>
  );
};

export default ReferatPage;
