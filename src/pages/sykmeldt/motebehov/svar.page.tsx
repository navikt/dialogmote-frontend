import React, { ReactElement } from "react";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { BodyLong, BodyShort, Link, Skeleton } from "@navikt/ds-react";
import SvarBehovForm from "@/common/components/motebehov/SvarBehovForm";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import {
  ARBEIDSGIVER_VIRKEMIDLER_OG_TILTAK_INFO_URL,
  SYKMELDT_DIALOGMOTE_MED_NAV_INFO_URL,
} from "@/common/constants/staticUrls";
import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { KanIkkeSvarePaaSvarBehov } from "@/common/components/motebehov/KanIkkeSvarePaaSvarBehov";
import { commonTextsForSvarAGAndSM } from "@/pages/arbeidsgiver/[narmestelederid]/motebehov/svar.page";
import { MotebehovSvarRequest } from "@/types/shared/motebehov";

export const commonTextsForSMSvarAndMeld = {
  formLabels: {
    checkboxOnskerBehandlerMedLabel:
      "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
    checkboxBehovForTolkLabel: "Jeg har behov for tolk.",
    hvaSlagsTolkLabel: "Hva slags tolk har du behov for? (Må fylles ut)",
  },
};

const texts = {
  title: "Ønsker du et dialogmøte med Nav?",
  formLabels: {
    legendRadioHarBehov:
      "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
    radioYes: "Ja, jeg ønsker et dialogmøte.",
    radioNo: "Nei, jeg mener det ikke er behov for et dialogmøte.",
    svarBegrunnelseDescriptionIfYes: "Hva ønsker du å ta opp i møtet?",
    svarBegrunnelseDescriptionIfNo:
      "Hvorfor mener du det ikke er behov for et dialogmøte?",
  },
};

export const sykmeldtLesMerLenkerSentence = (
  <>
    Les mer om{" "}
    <Link href={SYKMELDT_DIALOGMOTE_MED_NAV_INFO_URL} target="_blank">
      dialogmøte med Nav
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

const SvarBehovContent = () => {
  const { mutate, isPending } = useSvarPaMotebehovSM();
  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    mutate(motebehovSvar);
  };

  return (
    <>
      <BodyLong size="large" className="mb-6">
        {commonTextsForSvarAGAndSM.topBodyText}
      </BodyLong>

      <BodyShort className="mb-6">{sykmeldtLesMerLenkerSentence}</BodyShort>

      <SvarBehovForm
        formLabels={{
          radioHarBehovLegend: texts.formLabels.legendRadioHarBehov,
          radioYesLabel: texts.formLabels.radioYes,
          radioNoLabel: texts.formLabels.radioNo,
          svarBegrunnelseDescriptionIfYes:
            texts.formLabels.svarBegrunnelseDescriptionIfYes,
          svarBegrunnelseDescriptionIfNo:
            texts.formLabels.svarBegrunnelseDescriptionIfNo,
          checkboxOnskerBehandlerLabel:
            commonTextsForSMSvarAndMeld.formLabels
              .checkboxOnskerBehandlerMedLabel,
          checkboxHarBehovForTolkLabel:
            commonTextsForSMSvarAndMeld.formLabels.checkboxBehovForTolkLabel,
          hvaSlagsTolkLabel:
            commonTextsForSMSvarAndMeld.formLabels.hvaSlagsTolkLabel,
        }}
        isSvarBegrunnelseRequiredAlsoIfYes={false}
        isSubmitting={isPending}
        onSubmitForm={submitSvar}
        formIdentifier={"motebehov-arbeidstaker-svar"}
      />
    </>
  );
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();

  if (dialogmoteData.isLoading) {
    return (
      <SykmeldtSide title={texts.title} hideHeader={true}>
        <Skeleton variant="rectangle" width="100%" height="50rem" />
      </SykmeldtSide>
    );
  }

  if (
    dialogmoteData.isSuccess &&
    dialogmoteData.data.motebehov?.skjemaType != "SVAR_BEHOV"
  ) {
    return <KanIkkeSvarePaaSvarBehov title={texts.title} />;
  }

  return (
    <SykmeldtSide title={texts.title}>
      <SvarBehovContent />
    </SykmeldtSide>
  );
};

export default SvarBehov;
