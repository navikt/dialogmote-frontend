import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { commonTexts } from "@/common/constants/commonTexts";
import { MotebehovSvarRequest } from "types/shared/motebehov";

const texts = {
  title: "Meld behov for møte",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();
  const submitMutation = useSvarPaMotebehovSM();

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    submitMutation.mutate(motebehovSvar);
  };

  return (
    <PageContainer header={false}>
      <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
        <SvarBehovContent
          svarMotebehov={submitSvar}
          begrunnelseDescription={commonTexts.noSensitiveInfo}
        />
      </DialogmotePage>
    </PageContainer>
  );
};

export default SvarBehov;
