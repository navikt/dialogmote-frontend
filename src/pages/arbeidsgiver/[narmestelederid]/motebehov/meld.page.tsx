import { BodyLong, BodyShort } from "@navikt/ds-react";
import type { ReactElement } from "react";
import type {
  MotebehovSvarRequest,
  MotebehovSvarRequestAG,
} from "types/shared/motebehov";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import MeldBehovForm from "@/common/components/motebehov/MeldBehovForm";
import { ArbeidsgiverMeldBehovGuidePanel } from "@/common/components/motebehov/SvarOgMeldBehovGuidePanels";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";
import {
  arbeidsgiverLesMerLenkerSentence,
  commonTextsForAGSvarAndMeld,
} from "./svar.page";

const texts = {
  title: "Be om dialogmøte med Nav",
  topBodyText:
    "Som arbeidsgiver kan du når som helst i sykefraværsperioden be om et dialogmøte med Nav og den sykemeldte. Det gjør du ved å fylle ut og sende inn skjemaet nedenfor.",
  formLabels: {
    begrunnelseLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
    begrunnelseDescription:
      "Hva ønsker du å ta opp i møtet? Hva tenker du at Nav kan bistå med?",
  },
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const { mutate, isPending } = useSvarPaMotebehovAG();

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    const svar: MotebehovSvarRequestAG = {
      virksomhetsnummer: dialogmoteData.data?.sykmeldt?.orgnummer || "",
      arbeidstakerFnr: dialogmoteData.data?.sykmeldt?.fnr || "",
      formSubmission: motebehovSvar,
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
        formLabels={{
          begrunnelseLabel: texts.formLabels.begrunnelseLabel,
          begrunnelseDescription: texts.formLabels.begrunnelseDescription,
          checkboxOnskerBehandlerLabel:
            commonTextsForAGSvarAndMeld.formLabels
              .checkboxOnskerBehandlerMedLabel,
          checkboxHarBehovForTolkLabel:
            commonTextsForAGSvarAndMeld.formLabels.checkboxBehovForTolkLabel,
          hvaSlagsTolkLabel:
            commonTextsForAGSvarAndMeld.formLabels.hvaSlagsTolkLabel,
        }}
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
        formIdentifier={"motebehov-arbeidsgiver-meld"}
      />
    </ArbeidsgiverSide>
  );
};

export default MeldBehov;
