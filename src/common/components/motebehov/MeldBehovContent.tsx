import React, { useState } from "react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import PageHeader from "@/common/components/PageHeader";
import { Ingress } from "@navikt/ds-react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { MotebehovButtonRow } from "@/common/components/motebehov/MotebehovButtonRow";
import PersonvernInfo from "@/common/components/PersonvernInfo";
import { useSvarPaMotebehov } from "@/common/api/queries/motebehovQueries";
import {
  MotebehovBegrunnelseTextArea,
  validateBegrunnelse,
} from "@/common/components/motebehov/MotebehovBegrunnelseTextArea";
import { MeldBehovCheckboxGroup } from "@/common/components/motebehov/MeldBehovCheckboxGroup";
import {
  ErrorValues,
  MotebehovErrorSummary,
} from "@/common/components/motebehov/MotebehovErrorSummary";

export const texts = {
  title: "Meld behov for møte",
  ingress:
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
}

export const MeldBehovContent = ({
  motebehovTekst,
  behandlerVaereMedTekst,
  sensitivInfoTekst,
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
  const submitMutation = useSvarPaMotebehov();

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

      const behandlerBliMedTekst =
        behandlerBliMed === true ? behandlerVaereMedTekst : "";

      submitMutation.mutate({
        harMotebehov: behovForMote!!,
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
      <PageHeader title={texts.title} />

      <Ingress>{texts.ingress}</Ingress>

      <DialogmotePanel>
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

        <MotebehovButtonRow onSubmit={validateAndSubmit} />
      </DialogmotePanel>

      <PersonvernInfo />
    </>
  );
};
