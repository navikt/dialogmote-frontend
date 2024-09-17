import React, { ReactElement } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import {
  MotebehovSvarRequest,
  MotebehovSvarRequestAG,
} from "types/shared/motebehov";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import { arbeidsgiverLesMerLenkerSentence } from "./svar.page";
import { ArbeidsgiverMeldBehovGuidePanel } from "@/common/components/motebehov/SvarOgMeldBehovGuidePanels";
import MeldBehovForm from "@/common/components/motebehov/MeldBehovForm";

export const texts = {
  title: "Meld behov for et møte med NAV",
  topBodyText:
    "Som arbeidsgiver kan du når som helst i sykefraværsperioden be om et dialogmøte med NAV og den sykemeldte. Det gjør du ved å fylle ut og sende inn skjemaet nedenfor.",
  checkboxLabelHarBehovStart: "Jeg har behov for et møte med NAV og ",
  checkboxLabelOnskerBehandlerMed:
    "Jeg ønsker at den som sykmelder arbeidstakeren, også skal delta i møtet (valgfri).",
  // Not used, delete?
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const { mutate, isPending } = useSvarPaMotebehovAG();

  const ansattName = dialogmoteData.data?.sykmeldt?.navn || "den ansatte.";
  const motebehovTekst = `${texts.checkboxLabelHarBehovStart} ${ansattName}`;

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
      <BodyLong size="large" className="mb-6">
        {texts.topBodyText}
      </BodyLong>

      <BodyShort className="mb-6">{arbeidsgiverLesMerLenkerSentence}</BodyShort>

      <ArbeidsgiverMeldBehovGuidePanel />

      <MeldBehovForm
        checkboxLabelHarBehov={motebehovTekst}
        checkboxLabelOnskerAtBehandlerBlirMed={
          texts.checkboxLabelOnskerBehandlerMed
        }
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
      />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
