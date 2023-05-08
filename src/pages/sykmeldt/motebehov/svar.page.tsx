import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { commonTexts } from "@/common/constants/commonTexts";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

const texts = {
  title: "Meld behov for møte",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();
  const { mutate, isLoading } = useSvarPaMotebehovSM("svar");

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    mutate(motebehovSvar);
  };

  return (
    <PageContainer header={false}>
      <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
        <SvarBehovContent
          svarMotebehov={submitSvar}
          begrunnelseDescription={commonTexts.noSensitiveInfo}
          isLoading={isLoading}
        />
      </DialogmotePage>
    </PageContainer>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default SvarBehov;
