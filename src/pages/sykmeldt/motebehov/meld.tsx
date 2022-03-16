import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { ExtMotebehovSvar } from "@/server/data/types/external/ExternalMotebehovTypes";

export const texts = {
  title: "Meld behov for møte",
  behovForMote: "Jeg har behov for et møte med NAV",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). ",
  sensitivInfoTekst:
    "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();
  const submitMutation = useSvarPaMotebehovSM();

  const submitSvar = (motebehovSvar: ExtMotebehovSvar) => {
    submitMutation.mutate(motebehovSvar);
  };

  return (
    <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
      <MeldBehovContent
        motebehovTekst={texts.behovForMote}
        behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
        sensitivInfoTekst={texts.sensitivInfoTekst}
        meldMotebehov={submitSvar}
      />
    </DialogmotePage>
  );
};

export default MeldBehov;
