import { BodyLong, BodyShort } from "@navikt/ds-react";
import type { ReactElement } from "react";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import MeldBehovForm from "@/common/components/motebehov/MeldBehovForm";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import type { MotebehovSvarRequest } from "@/types/shared/motebehov";
import {
  commonTextsForSMSvarAndMeld,
  sykmeldtLesMerLenkerSentence,
} from "./svar.page";

const texts = {
  title: "Be om dialogmøte med Nav",
  topBodyText:
    "Du kan når som helst i sykefraværsperioden be om at Nav avholder et dialogmøte med deg og din arbeidsgiver. Det gjør du ved å fylle ut og sende inn skjemaet nedenfor.",
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
        formIdentifier={"motebehov-arbeidstaker-meld"}
      />
    </SykmeldtSide>
  );
};

export default MeldBehov;
