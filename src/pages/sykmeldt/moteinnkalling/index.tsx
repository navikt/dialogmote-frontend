import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { MoteinnkallingContent } from "@/common/components/moteinnkalling/MoteinnkallingContent";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";

const Moteinnkalling = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();

  return (
    <PageContainer header={false}>
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
