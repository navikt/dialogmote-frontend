import React, { ReactElement } from "react";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import {
  ExtMotebehovSvar,
  ExtMotebehovSvarArbeidsgiver,
} from "@/server/data/types/external/ExternalMotebehovTypes";

const texts = {
  title: "Meld behov for møte",
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const submitMutation = useSvarPaMotebehovAG();

  const submitSvar = (motebehovSvar: ExtMotebehovSvar) => {
    const svar: ExtMotebehovSvarArbeidsgiver = {
      virksomhetsnummer: dialogmoteData.data?.sykmeldt?.orgnummer || "",
      arbeidstakerFnr: dialogmoteData.data?.sykmeldt?.fnr || "",
      motebehovSvar: motebehovSvar,
    };
    submitMutation.mutate(svar);
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
