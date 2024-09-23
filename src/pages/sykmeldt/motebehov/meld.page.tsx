import React, { ReactElement } from "react";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import { sykmeldtLesMerLenkerSentence } from "./svar.page";
import MeldBehovForm from "@/common/components/motebehov/MeldBehovForm";

export const texts = {
  title: "Meld behov for møte",
  topBodyText:
    "Du kan når som helst i sykefraværsperioden be om at NAV avholder et dialogmøte med deg og din arbeidsgiver. Det gjør du ved å fylle ut og sende inn skjemaet nedenfor.",
  checkboxLabelHarBehov: "Jeg ønsker et møte med NAV og arbeidsgiveren min.",
  checkboxLabelOnskerBehandlerMed:
    "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri).",
  // Not used, delete?
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const { mutate, isPending } = useSvarPaMotebehovSM();

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    mutate(motebehovSvar);
  };

  return (
    <SykmeldtSide title={texts.title}>
      <BodyLong size="large" className="mb-6">
        {texts.topBodyText}
      </BodyLong>

      <BodyShort className="mb-6">{sykmeldtLesMerLenkerSentence}</BodyShort>

      <MeldBehovForm
        checkboxLabelHarBehov={texts.checkboxLabelHarBehov}
        checkboxLabelOnskerAtBehandlerBlirMed={
          texts.checkboxLabelOnskerBehandlerMed
        }
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
      />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
