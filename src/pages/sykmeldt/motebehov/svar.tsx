import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { ExtMotebehovSvar } from "@/server/data/types/external/ExternalMotebehovTypes";

const texts = {
  title: "Meld behov for møte",
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel om den ansattes helse.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();
  const submitMutation = useSvarPaMotebehovSM();

  const submitSvar = (motebehovSvar: ExtMotebehovSvar) => {
    submitMutation.mutate(motebehovSvar);
  };

  return (
    <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
      <SvarBehovContent
        svarMotebehov={submitSvar}
        begrunnelseDescription={texts.begrunnelseDescription}
      />
    </DialogmotePage>
  );
};

export default SvarBehov;
