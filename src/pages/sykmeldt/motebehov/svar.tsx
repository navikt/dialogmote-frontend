import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement, useEffect } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";

const texts = {
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel om den ansattes helse.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();

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
