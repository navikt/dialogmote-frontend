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
  title: "Be om dialogmøte med NAV",
  topBodyText:
    "Som arbeidsgiver kan du når som helst i sykefraværsperioden be om et dialogmøte med NAV og den sykemeldte. Det gjør du ved å fylle ut og sende inn skjemaet nedenfor.",
  formLabels: {
    begrunnelseLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
    begrunnelseDescription:
      "Dette hjelper oss å forberede møtet. Er det noe du ønsker å foreslå? Er det noe du ønsker at NAV bistår med?",
    checkboxOnskerBehandlerMedLabel:
      "Jeg ønsker at den som har sykmeldt den ansatte (lege/behandler) også deltar i møtet.",
  },
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const { mutate, isPending } = useSvarPaMotebehovAG();

  // const ansattName = dialogmoteData.data?.sykmeldt?.navn || "den ansatte.";
  // const motebehovTekst = `${texts.formLabels.checkboxLabelHarBehovStart} ${ansattName}`;

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
        formLabels={{
          begrunnelseLabel: texts.formLabels.begrunnelseLabel,
          begrunnelseDescription: texts.formLabels.begrunnelseDescription,
          checkboxOnskerBehandlerMedLabel:
            texts.formLabels.checkboxOnskerBehandlerMedLabel,
        }}
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
      />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
