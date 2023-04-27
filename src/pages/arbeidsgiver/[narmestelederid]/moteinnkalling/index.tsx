import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import { getAgSideMenuHeader } from "@/common/utils/arbeidsgiverSideMenu";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <PageContainer header={getAgSideMenuHeader(dialogmoteData.data)}>
      <DialogmotePage
        title={"Innkalling til Dialogmøte"}
        hideHeader={true}
        isLoading={dialogmoteData.isLoading}
      >
        {dialogmoteData.isSuccess ? (
          <MoteinnkallingContent
            moteinnkalling={dialogmoteData.data.moteinnkalling}
          />
        ) : null}
      </DialogmotePage>
    </PageContainer>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Moteinnkalling;
