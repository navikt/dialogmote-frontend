import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";

export const texts = {
  behovForMoteTekst: "Jeg har behov for et møte med NAV og ",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder arbeidstakeren, også skal delta i møtet (valgfri). ",
  begrunnelseLabel: "Begrunnelse (valgfri)",
  sensitivInfoTekst:
    "Ikke skriv sensitiv informasjon, for eksempel om den ansattes helse.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  if (dialogmoteData.isError) {
    return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
  }

  if (dialogmoteData.isSuccess) {
    const motebehov = dialogmoteData.data.motebehov;

    if (motebehov === undefined) {
      return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
    }

    const ansattName = dialogmoteData.data.sykmeldtName || "den ansatte.";
    const motebehovTekst = `${texts.behovForMoteTekst} ${ansattName}`;

    return (
      <MeldBehovContent
        motebehovTekst={motebehovTekst}
        behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
        sensitivInfoTekst={texts.sensitivInfoTekst}
      />
    );
  }
  return <AppSpinner />;
};

export default MeldBehov;
