import React, { ReactElement, useState } from "react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import PageHeader from "@/common/components/header/PageHeader";
import { Alert, BodyLong, Ingress, Link } from "@navikt/ds-react";
import { DIALOGMOTE_INFO_URL } from "@/common/constants/staticUrls";
import { HuskOppfolgingsplanGuidePanel } from "@/common/components/motebehov/HuskOppfolgingsplanGuidePanel";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import {
  MotebehovBegrunnelseTextArea,
  validateBegrunnelse,
} from "@/common/components/motebehov/MotebehovBegrunnelseTextArea";
import { SvarBehovRadioGroup } from "@/common/components/motebehov/SvarBehovRadioGroup";
import {
  ErrorValues,
  MotebehovErrorSummary,
} from "@/common/components/motebehov/MotebehovErrorSummary";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { ButtonRow } from "@/common/components/button/ButtonRow";
import { ExtMotebehovSvar } from "@/server/data/types/external/ExternalMotebehovTypes";

const texts = {
  title: "Meld behov for møte",
  ingressText:
    "Ifølge folketrygdloven skal NAV innkalle til dialogmøte senest innen 26 ukers sykefravær, med mindre det er åpenbart unødvendig. Vi bruker opplysningene du gir her til å vurdere om det er behov for møte. ",
  ingressLink: "Les om dialogmøte.",
  obligatoriskeFeltInfo:
    "Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.",
  svarNeiAlert:
    "Selv om du svarer nei, kan det hende vi likevel kommer til at det er nødvendig med et møte. Svaret ditt brukes når vi vurderer behovet.",
  feiloppsummeringTittel: "For å gå videre må du rette opp følgende:",
  motebehovIkkeValgt:
    "Du må velge ja eller nei for å kunne sende inn skjemaet.",
};

const harMotebehovRadioId = "harMotebehovRadioId";
const begrunnelseTextAreaId = "begrunnelseTextArea";

interface Props {
  begrunnelseDescription: string;
  svarMotebehov: (svar: ExtMotebehovSvar) => void;
}

export const SvarBehovContent = ({
  begrunnelseDescription,
  svarMotebehov,
}: Props): ReactElement => {
  const [behovForMote, setBehovForMote] = React.useState<boolean | null>(null);
  const [behovForMoteError, setBehovForMoteError] = useState<string | null>();
  const [begrunnelse, setBegrunnelse] = React.useState<string>("");
  const [begrunnelseError, setBegrunnelseError] = useState<
    string | undefined
  >();
  const { trackEvent } = useAmplitude();

  const validateMotebehov = (): boolean => {
    if (behovForMote === null) {
      setBehovForMoteError(texts.motebehovIkkeValgt);
      return false;
    } else {
      setBehovForMoteError(null);
      return true;
    }
  };

  const validateAndSubmit = () => {
    if (
      validateMotebehov() &&
      validateBegrunnelse(
        behovForMote === true,
        begrunnelse,
        setBegrunnelseError
      )
    ) {
      trackEvent(Events.SendSvarBehov);

      svarMotebehov({
        harMotebehov: behovForMote!!,
        forklaring: begrunnelse,
      });
    }
  };

  const getErrors = (): Array<ErrorValues> => {
    const errorArray: Array<ErrorValues> = [];

    if (behovForMoteError) {
      errorArray.push({
        href: `#${harMotebehovRadioId}`,
        text: behovForMoteError,
      });
    }
    if (begrunnelseError) {
      errorArray.push({
        href: `#${begrunnelseTextAreaId}`,
        text: begrunnelseError,
      });
    }

    return errorArray;
  };

  return (
    <>
      <PageHeader title={texts.title} />

      <Ingress>
        {texts.ingressText}{" "}
        <Link href={DIALOGMOTE_INFO_URL}>{texts.ingressLink}</Link>
      </Ingress>

      <HuskOppfolgingsplanGuidePanel />

      <BodyLong spacing>{texts.obligatoriskeFeltInfo}</BodyLong>

      <DialogmotePanel>
        <MotebehovErrorSummary errors={getErrors()} />

        <SvarBehovRadioGroup
          id={harMotebehovRadioId}
          error={behovForMoteError}
          clearErrors={() => setBehovForMoteError(null)}
          setBehovForMote={setBehovForMote}
        />

        {behovForMote === false && (
          <Alert variant="info">{texts.svarNeiAlert}</Alert>
        )}

        <MotebehovBegrunnelseTextArea
          id={begrunnelseTextAreaId}
          isOptional={behovForMote === true}
          description={begrunnelseDescription}
          error={begrunnelseError}
          clearErrors={() => setBegrunnelseError("")}
          begrunnelse={begrunnelse}
          setBegrunnelse={setBegrunnelse}
        />

        <ButtonRow>
          <SubmitButton onSubmit={validateAndSubmit} />
          <CancelButton />
        </ButtonRow>
      </DialogmotePanel>

      <PersonvernInfo />
    </>
  );
};
