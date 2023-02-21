import React, { useState } from "react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import { Ingress } from "@navikt/ds-react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import {
  MotebehovBegrunnelseTextArea,
  validateBegrunnelse,
} from "@/common/components/motebehov/MotebehovBegrunnelseTextArea";
import { MeldBehovCheckboxGroup } from "@/common/components/motebehov/MeldBehovCheckboxGroup";
import {
  ErrorValues,
  MotebehovErrorSummary,
} from "@/common/components/motebehov/MotebehovErrorSummary";
import { ButtonRow } from "@/common/components/button/ButtonRow";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { MotebehovSvarRequest } from "types/shared/motebehov";

export const texts = {
  obligatoriskeFeltInfo:
    "Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.",
  begrunnelseLabel: "Begrunnelse (valgfri)",
  motebehovIkkeValgt:
    "Du må krysse av for møtebehov for å kunne sende inn skjemaet.",
};

const behovForMoteCheckboxId = "behovForMoteCheckbox";
const begrunnelseTextAreaId = "begrunnelseTextArea";

interface Props {
  motebehovTekst: string;
  behandlerVaereMedTekst: string;
  sensitivInfoTekst: string;
  meldMotebehov: (svar: MotebehovSvarRequest) => void;
}

export const MeldBehovContent = ({
  motebehovTekst,
  behandlerVaereMedTekst,
  sensitivInfoTekst,
  meldMotebehov,
}: Props) => {
  const [behovForMote, setBehovForMote] = React.useState<boolean | undefined>();
  const [behovForMoteError, setBehovForMoteError] = useState<
    string | undefined
  >();
  const [behandlerBliMed, setBehandlerBliMed] = React.useState<
    boolean | undefined
  >();
  const [begrunnelse, setBegrunnelse] = React.useState<string>("");
  const [begrunnelseError, setBegrunnelseError] = useState<
    string | undefined
  >();
  const { trackEvent } = useAmplitude();

  const validateBehovForMote = () => {
    if (!behovForMote) {
      setBehovForMoteError(texts.motebehovIkkeValgt);
      return false;
    }
    setBehovForMoteError(undefined);
    return true;
  };

  const validateAndSubmit = () => {
    if (
      validateBehovForMote() &&
      validateBegrunnelse(true, begrunnelse, setBegrunnelseError)
    ) {
      trackEvent(Events.SendMeldBehov);

      const behandlerBliMedTekst = !!behandlerBliMed
        ? behandlerVaereMedTekst
        : "";

      meldMotebehov({
        harMotebehov: !!behovForMote,
        forklaring: `${behandlerBliMedTekst}${begrunnelse}`,
      });
    }
  };

  const getErrors = (): Array<ErrorValues> => {
    const errorArray: Array<ErrorValues> = [];

    if (behovForMoteError) {
      errorArray.push({
        href: `#${behovForMoteCheckboxId}`,
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
      <Ingress spacing>{texts.obligatoriskeFeltInfo}</Ingress>

      <DialogmotePanel>
        <form>
          <MotebehovErrorSummary errors={getErrors()} />

          <MeldBehovCheckboxGroup
            behovForMoteId={behovForMoteCheckboxId}
            setBehovForMote={setBehovForMote}
            clearErrors={() => setBehovForMoteError(undefined)}
            setBehandlerBliMed={setBehandlerBliMed}
            behandlerVaereMedTekst={behandlerVaereMedTekst}
            motebehovTekst={motebehovTekst}
            error={behovForMoteError}
          />

          <MotebehovBegrunnelseTextArea
            id={begrunnelseTextAreaId}
            isOptional={true}
            description={sensitivInfoTekst}
            error={begrunnelseError}
            begrunnelse={begrunnelse}
            clearErrors={() => setBegrunnelseError("")}
            setBegrunnelse={setBegrunnelse}
          />

          <ButtonRow>
            <SubmitButton onSubmit={validateAndSubmit} />
            <CancelButton />
          </ButtonRow>
        </form>
      </DialogmotePanel>
    </>
  );
};
