import React, { ReactElement } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import {
  MotebehovSvarRequest,
  MotebehovSvarRequestAG,
} from "types/shared/motebehov";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import ArbeidsgiverSide from "@/common/components/page/ArbeidsgiverSide";
import SvarBehovForm from "@/common/components/motebehov/SvarBehovForm";
import { ArbeidsgiverSvarPaaBehovGuidePanel } from "@/common/components/motebehov/SvarOgMeldBehovGuidePanels";
import { BodyLong, BodyShort, Link } from "@navikt/ds-react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import {
  ARBEIDSGIVER_DIALOGMOTE_MED_NAV_INFO_URL,
  ARBEIDSGIVER_VIRKEMIDLER_OG_TILTAK_INFO_URL,
} from "@/common/constants/staticUrls";

export const commonTextsForSvarAGAndSM = {
  topBodyText:
    "Senest innen 26 ukers sykefravær kaller NAV inn til et dialogmøte, med mindre det er åpenbart unødvendig. Vi ber om at du fyller ut og sender inn skjemaet nedenfor for å hjelpe oss å vurdere behovet for et slikt møte.",
};

export const commonTextsForAGSvarAndMeld = {
  formLabels: {
    checkboxOnskerBehandlerMedLabel:
      "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
    checkboxBehovForTolkLabel: "Vi har behov for tolk.",
    hvaSlagsTolkLabel: "Hva slags tolk har dere behov for? (Må fylles ut)",
  },
};

const texts = {
  title: "Har dere behov for et dialogmøte med NAV?",
  formLabels: {
    radioHarBehovLegend: "Har dere behov for et dialogmøte med NAV?",
    radioHarBehovDescription:
      "Du svarer på vegne av arbeidsgiver. Den ansatte har fått det samme spørsmålet og svarer på vegne av seg selv.",
    radioYes: "Ja, vi har behov for et dialogmøte.",
    radioNo: "Nei, vi har ikke behov for et dialogmøte nå.",
    svarBegrunnelseDescriptionIfYes:
      "Hva ønsker du å ta opp i møtet? Hva tenker du at NAV kan bistå med?",
    svarBegrunnelseDescriptionIfNo:
      "Hvorfor mener du det ikke er behov for et dialogmøte?",
  },
};

export const arbeidsgiverLesMerLenkerSentence = (
  <>
    Les mer om{" "}
    <Link href={ARBEIDSGIVER_DIALOGMOTE_MED_NAV_INFO_URL} target="_blank">
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
        {commonTextsForSvarAGAndSM.topBodyText}
      </BodyLong>

      <BodyShort className="mb-6">{arbeidsgiverLesMerLenkerSentence}</BodyShort>

      <ArbeidsgiverSvarPaaBehovGuidePanel />

      <SvarBehovForm
        formLabels={{
          radioHarBehovLegend: texts.formLabels.radioHarBehovLegend,
          radioHarBehovDescription: texts.formLabels.radioHarBehovDescription,
          radioYesLabel: texts.formLabels.radioYes,
          radioNoLabel: texts.formLabels.radioNo,
          svarBegrunnelseDescriptionIfYes:
            texts.formLabels.svarBegrunnelseDescriptionIfYes,
          svarBegrunnelseDescriptionIfNo:
            texts.formLabels.svarBegrunnelseDescriptionIfNo,
          checkboxOnskerBehandlerLabel:
            commonTextsForAGSvarAndMeld.formLabels
              .checkboxOnskerBehandlerMedLabel,
          checkboxHarBehovForTolkLabel:
            commonTextsForAGSvarAndMeld.formLabels.checkboxBehovForTolkLabel,
          hvaSlagsTolkLabel:
            commonTextsForAGSvarAndMeld.formLabels.hvaSlagsTolkLabel,
        }}
        isSvarBegrunnelseRequiredAlsoIfYes
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
        formIdentifier={"motebehov-arbeidsgiver-svar"}
      />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default SvarBehov;
