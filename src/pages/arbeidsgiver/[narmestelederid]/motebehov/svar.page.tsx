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

const texts = {
  title: "Har dere behov for et dialogmøte med NAV?",
  topBodyText:
    "Senest innen 26 ukers sykefravær kaller NAV inn til et dialogmøte, med mindre det er åpenbart unødvendig. Vi ber om at du fyller ut og sender inn skjemaet nedenfor for å hjelpe oss å vurdere behovet for et slikt møte.",
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

      <ArbeidsgiverSvarPaaBehovGuidePanel />

      <SvarBehovForm isSubmitting={isPending} onSubmitForm={submitSvar} />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default SvarBehov;
