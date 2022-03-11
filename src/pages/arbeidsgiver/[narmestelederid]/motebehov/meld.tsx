import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import {
  ExtMotebehovSvar,
  ExtMotebehovSvarArbeidsgiver,
} from "@/server/data/types/external/ExternalMotebehovTypes";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";

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

    if (motebehov === undefined) {
      return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
    }

    const ansattName = dialogmoteData.data.sykmeldt?.navn || "den ansatte.";
    const motebehovTekst = `${texts.behovForMoteTekst} ${ansattName}`;

    return (
      <MeldBehovContent
        motebehovTekst={motebehovTekst}
        behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
        sensitivInfoTekst={texts.sensitivInfoTekst}
        meldMotebehov={submitSvar}
      />
    );
  }
  return <AppSpinner />;
};

export default MeldBehov;
