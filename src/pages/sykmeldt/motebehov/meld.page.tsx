import React, { ReactElement } from "react";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import {
  commonTextsForSMSvarAndMeld,
  sykmeldtLesMerLenkerSentence,
} from "./svar.page";
import MeldBehovForm from "@/common/components/motebehov/MeldBehovForm";

const texts = {
  title: "Be om dialogmøte med NAV",
  topBodyText:
    "Du kan når som helst i sykefraværsperioden be om at NAV avholder et dialogmøte med deg og din arbeidsgiver. Det gjør du ved å fylle ut og sende inn skjemaet nedenfor.",
  formLabels: {
    begrunnelseLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
  },
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
        formLabels={{
          begrunnelseLabel: texts.formLabels.begrunnelseLabel,
          checkboxOnskerBehandlerLabel:
            commonTextsForSMSvarAndMeld.formLabels
              .checkboxOnskerBehandlerMedLabel,
          checkboxHarBehovForTolkLabel:
            commonTextsForSMSvarAndMeld.formLabels.checkboxBehovForTolkLabel,
          hvaSlagsTolkLabel:
            commonTextsForSMSvarAndMeld.formLabels.hvaSlagsTolkLabel,
        }}
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
      />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
