import React, { ReactElement } from "react";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { BodyLong, BodyShort, Link } from "@navikt/ds-react";
import SvarBehovForm from "@/common/components/motebehov/SvarBehovForm";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import {
  ARBEIDSGIVER_VIRKEMIDLER_OG_TILTAK_INFO_URL,
  SYKMELDT_DIALOGMOTE_MED_NAV_INFO_URL,
} from "@/common/constants/staticUrls";

const texts = {
  title: "Ønsker du et dialogmøte med NAV?",
  topBodyText:
    "Senest innen 26 ukers sykefravær kaller NAV inn til et dialogmøte, med mindre det er åpenbart unødvendig. Vi ber om at du fyller ut og sender inn skjemaet nedenfor for å hjelpe oss å vurdere behovet for et slikt møte.",
  formLabels: {
    legendRadioHarBehov:
      "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
    radioYes: "Ja, jeg ønsker et dialogmøte.",
    radioNo: "Nei, jeg mener det ikke er behov for et dialogmøte.",
    checkboxOnskerBehandlerMedLabel:
      "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
  },
};

export const sykmeldtLesMerLenkerSentence = (
  <>
    Les mer om{" "}
    <Link href={SYKMELDT_DIALOGMOTE_MED_NAV_INFO_URL} target="_blank">
      dialogmøte med NAV
      <ExternalLinkIcon title="åpner i ny fane-ikon" />
    </Link>{" "}
    og{" "}
    <Link href={ARBEIDSGIVER_VIRKEMIDLER_OG_TILTAK_INFO_URL} target="_blank">
      virkemidler og tiltak
      <ExternalLinkIcon title="åpner i ny fane-ikon" />
    </Link>{" "}
    vi kan bistå med. (Lenkene åpner i en ny fane.)
  </>
);

const SvarBehov = (): ReactElement => {
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

      <SvarBehovForm
        formLabels={{
          radioHarBehovLegend: texts.formLabels.legendRadioHarBehov,
          radioYesLabel: texts.formLabels.radioYes,
          radioNoLabel: texts.formLabels.radioNo,
          checkboxOnskerBehandlerMedLabel:
            texts.formLabels.checkboxOnskerBehandlerMedLabel,
        }}
        isBegrunnelseRequiredAlsoIfYes={false}
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
      />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default SvarBehov;
