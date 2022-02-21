import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";

const texts = {
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  if (dialogmoteData.isError) {
    return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
  }

  if (dialogmoteData.isSuccess) {
    const motebehov = dialogmoteData.data.motebehov;

    if (motebehov === undefined || motebehov.skjemaType === "MELD_BEHOV") {
      return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
    }

    return (
      <SvarBehovContent begrunnelseDescription={texts.begrunnelseDescription} />
    );
  }
  return <AppSpinner />;
};

export default SvarBehov;
