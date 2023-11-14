import React, { ReactElement } from "react";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import { commonTexts } from "@/common/constants/commonTexts";
import {
  MotebehovSvarRequest,
  MotebehovSvarRequestAG,
} from "types/shared/motebehov";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";

export const texts = {
  title: "Meld behov for møte",
  behovForMoteTekst: "Jeg har behov for et møte med NAV og ",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder arbeidstakeren, også skal delta i møtet (valgfri). ",
  begrunnelseLabel: "Begrunnelse (valgfri)",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const { mutate, isPending } = useSvarPaMotebehovAG();

  const ansattName = dialogmoteData.data?.sykmeldt?.navn || "den ansatte.";
  const motebehovTekst = `${texts.behovForMoteTekst} ${ansattName}`;

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    const svar: MotebehovSvarRequestAG = {
      virksomhetsnummer: dialogmoteData.data?.sykmeldt?.orgnummer || "",
      arbeidstakerFnr: dialogmoteData.data?.sykmeldt?.fnr || "",
      motebehovSvar: motebehovSvar,
    };
    mutate(svar);
  };

  return (
    <ArbeidsgiverSide title={texts.title}>
      <MeldBehovContent
        motebehovTekst={motebehovTekst}
        behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
        sensitivInfoTekst={commonTexts.noSensitiveInfo}
        meldMotebehov={submitSvar}
        isSubmitting={isPending}
      />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
