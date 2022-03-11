import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { ExtMotebehovSvar } from "@/server/data/types/external/ExternalMotebehovTypes";

const texts = {
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel om den ansattes helse.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();
  const submitMutation = useSvarPaMotebehovSM();

  if (dialogmoteData.isError) {
    return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
  }

  if (dialogmoteData.isSuccess) {
    const motebehov = dialogmoteData.data.motebehov;

    const submitSvar = (motebehovSvar: ExtMotebehovSvar) => {
      submitMutation.mutate(motebehovSvar);
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
