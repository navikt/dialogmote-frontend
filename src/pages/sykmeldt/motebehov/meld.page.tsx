import React, { ReactElement } from "react";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import { sykmeldtLesMerLenkerSentence } from "./svar.page";
import MeldBehovForm from "@/common/components/motebehov/MeldBehovForm";

export const texts = {
  title: "Be om dialogmøte med NAV",
  topBodyText:
    "Du kan når som helst i sykefraværsperioden be om at NAV avholder et dialogmøte med deg og din arbeidsgiver. Det gjør du ved å fylle ut og sende inn skjemaet nedenfor.",
  formLabels: {
    begrunnelseLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
    checkboxOnskerBehandlerMedLabel:
      "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
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
          checkboxOnskerBehandlerMedLabel:
            texts.formLabels.checkboxOnskerBehandlerMedLabel,
        }}
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
      />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
