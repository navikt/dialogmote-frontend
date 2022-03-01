import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";

export const texts = {
  behovForMote: "Jeg har behov for et møte med NAV",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). ",
  sensitivInfoTekst:
    "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();

  if (dialogmoteData.isError) {
    return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
  }

  if (dialogmoteData.isSuccess) {
    const motebehov = dialogmoteData.data.motebehov;

    if (motebehov === undefined) {
      return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
    }

    return (
      <MeldBehovContent
        motebehovTekst={texts.behovForMote}
        behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
        sensitivInfoTekst={texts.sensitivInfoTekst}
      />
    );
  }
  return <AppSpinner />;
};

export default MeldBehov;
