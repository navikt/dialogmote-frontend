import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import { commonTexts } from "@/common/constants/commonTexts";
import { getAgSideMenuHeader } from "@/common/utils/arbeidsgiverSideMenu";
import {
  MotebehovSvarRequest,
  MotebehovSvarRequestAG,
} from "types/shared/motebehov";

const texts = {
  title: "Meld behov for møte",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const submitMutation = useSvarPaMotebehovAG();

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    const svar: MotebehovSvarRequestAG = {
      virksomhetsnummer: dialogmoteData.data?.sykmeldt?.orgnummer || "",
      arbeidstakerFnr: dialogmoteData.data?.sykmeldt?.fnr || "",
      motebehovSvar: motebehovSvar,
    };
    submitMutation.mutate(svar);
  };

  return (
    <PageContainer header={getAgSideMenuHeader(dialogmoteData.data)}>
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
