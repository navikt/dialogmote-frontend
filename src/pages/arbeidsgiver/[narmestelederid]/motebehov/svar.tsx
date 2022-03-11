import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import {
  ExtMotebehovSvar,
  ExtMotebehovSvarArbeidsgiver,
} from "@/server/data/types/external/ExternalMotebehovTypes";

const texts = {
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const submitMutation = useSvarPaMotebehovAG();

  if (dialogmoteData.isError) {
    return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
  }

  if (dialogmoteData.isSuccess) {
    const motebehov = dialogmoteData.data.motebehov;

    const submitSvar = (motebehovSvar: ExtMotebehovSvar) => {
      const svar: ExtMotebehovSvarArbeidsgiver = {
        virksomhetsnummer: dialogmoteData.data.sykmeldt!!.orgnummer,
        arbeidstakerFnr: dialogmoteData.data.sykmeldt!!.fnr,
        motebehovSvar: motebehovSvar,
      };
      submitMutation.mutate(svar);
    };

    if (motebehov === undefined || motebehov.skjemaType === "MELD_BEHOV") {
      return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
    }

    return (
      <SvarBehovContent
        svarMotebehov={submitSvar}
        begrunnelseDescription={texts.begrunnelseDescription}
      />
    );
  }
  return <AppSpinner />;
};

export default SvarBehov;
