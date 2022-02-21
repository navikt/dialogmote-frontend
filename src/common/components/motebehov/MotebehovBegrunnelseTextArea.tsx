import { Textarea } from "@navikt/ds-react";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

const begrunnelseMaxLength = 1000;

const texts = {
  begrunnelseLabel: "Begrunnelse",
  begrunnelseValgfriLabel: "Begrunnelse (valgfri)",
  begrunnelseMangler:
    "Du må legge inn begrunnelse dersom du mener det ikke er behov for møte.",
  begrunnelseUgyldigTegn: "Ugyldig spesialtegn er oppgitt.",
  begrunnelseOverMaksTegn: `Maks ${begrunnelseMaxLength} tegn er tillatt.`,
};

interface Props {
  id: string;
  isOptional: boolean;
  description: string;
  begrunnelse: string;
  error: ReactNode;

  clearErrors: () => void;
  setBegrunnelse: Dispatch<SetStateAction<string>>;
}

export const validateBegrunnelse = (
  isOptional: boolean,
  begrunnelse: string,
  setBegrunnelseError: Dispatch<SetStateAction<string | undefined>>
): boolean => {
  if (!isOptional && begrunnelse.trim().length < 1) {
    setBegrunnelseError(texts.begrunnelseMangler);
    return false;
  } else if (begrunnelse.match(new RegExp(".*<[^ ][^>]+[^ ]>.*"))) {
    setBegrunnelseError(texts.begrunnelseUgyldigTegn);
    return false;
  } else if (begrunnelse.length > begrunnelseMaxLength) {
    setBegrunnelseError(texts.begrunnelseOverMaksTegn);
    return false;
  } else {
    setBegrunnelseError("");
    return true;
  }
};

export const MotebehovBegrunnelseTextArea = ({
  id,
  isOptional,
  description,
  begrunnelse,
  error,
  clearErrors,
  setBegrunnelse,
}: Props) => {
  return (
    <Textarea
      id={id}
      label={
        isOptional ? texts.begrunnelseValgfriLabel : texts.begrunnelseLabel
      }
      description={description}
      maxLength={begrunnelseMaxLength}
      minRows={4}
      error={!!error}
      value={begrunnelse}
      onChange={(e) => {
        clearErrors();
        setBegrunnelse(e.target.value);
      }}
      size="medium"
    />
  );
};
