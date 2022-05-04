import { Events } from "@/common/amplitude/events";
import { useSvarPaInnkallelse } from "@/common/api/queries/brevQueries";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { SvarType } from "@/server/data/types/external/BrevTypes";
import {
  Alert,
  BodyLong,
  Button,
  ErrorSummary,
  Radio,
  RadioGroup,
  Textarea,
} from "@navikt/ds-react";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

const KnappStyled = styled(Button)`
  width: fit-content;
`;

const SvarStyled = styled(DialogmotePanel)`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const SmallText = styled.text`
  font-size: 16px;
  line-height: 22px;
`;

const texts = {
  title: "Svar om du kan komme",
  svarLegend: "Kommer du til møtet? (obligatorisk)",
  svarRequired: "Du må velge et svar",
  responseRequired: "Svar på innkallingen",
  svarKommer: "Jeg kommer",
  svarEndring: "Jeg ønsker å endre tidspunkt eller sted",
  svarAvlysning: "Jeg ønsker å avlyse",
  infoEndring: `Husk å begrunne svaret godt slik at vi kan ta beslutningen på et best mulig grunnlag. Du får et nytt varsel hvis møtet endres.`,
  infoAvlysning: `Husk å begrunne svaret godt slik at vi kan ta beslutningen på et best mulig grunnlag. Du får et nytt varsel hvis møtet avlyses.`,
  begrunnelseRequired: "Begrunnelse er obligatorisk",
  begrunnelseMaxLength: "Begrunnelse kan ikke være lenger enn 300 tegn",
  begrunnelseEndringLabel:
    "Hvorfor ønsker du å endre tidspunkt eller sted? (obligatorisk)",
  begrunnelseAvlysningLabel: "Hvorfor ønsker du å avlyse? (obligatorisk)",
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
  feiloppsummeringTittel: "For å gå videre må du rette opp følgende:",
  errorMessage: "Svaret ditt kom ikke frem. Kan du prøve igjen?",
  sendSvar: "Send svar",
};

const inputFields = {
  svarType: "svarType",
  begrunnelseEndring: "begrunnelseEndring",
  begrunnelseAvlysning: "begrunnelseAvlysning",
};

type InputFieldType =
  | typeof inputFields.svarType
  | typeof inputFields.begrunnelseEndring
  | typeof inputFields.begrunnelseAvlysning;

interface FormData {
  svarType?: SvarType;
  begrunnelse: string;
}

interface Error {
  inputField: InputFieldType;
  errorMsg: string;
}

interface Props {
  brevUuid: string;
}

const GiSvarPaInnkallelseB = ({ brevUuid }: Props): ReactElement => {
  const { trackEvent } = useAmplitude();
  const sendSvarQuery = useSvarPaInnkallelse(brevUuid);
  const [error, setError] = useState<Array<Error>>([]);
  const [formData, setFormData] = useState<FormData>({
    svarType: undefined,
    begrunnelse: "",
  });

  const abVariant = "B";

  useEffect(() => {
    trackEvent(Events.GiSvarPaMoteInnkallingVist, { variant: abVariant });
  }, []);

  const updateError = (inputField: InputFieldType, errorMsg: string) => {
    setError([
      {
        inputField: inputField,
        errorMsg: errorMsg,
      },
    ]);
  };

  const begrunnelseDescriptionSmallText = (
    <SmallText>{texts.begrunnelseDescription}</SmallText>
  );

  const begrunnelseFieldName: InputFieldType =
    formData.svarType === "KOMMER_IKKE"
      ? inputFields.begrunnelseAvlysning
      : inputFields.begrunnelseEndring;

  const validateForm = (): boolean => {
    if (!formData.svarType) {
      updateError(inputFields.svarType, texts.responseRequired);
      return false;
    }

    if (
      formData.svarType === "NYTT_TID_STED" ||
      formData.svarType === "KOMMER_IKKE"
    ) {
      if (!formData.begrunnelse) {
        updateError(begrunnelseFieldName, texts.begrunnelseRequired);
        return false;
      }
      if (formData.begrunnelse.length > 300) {
        updateError(begrunnelseFieldName, texts.begrunnelseMaxLength);
        return false;
      }
    }
    setError([]);
    return true;
  };

  const validateAndSubmit = () => {
    const validated = validateForm();

    if (validated) {
      trackEvent(Events.SendSvarPaInnkallelse, {
        svarAlternativ: formData.svarType!!,
        variant: abVariant,
      });

      sendSvarQuery.mutate({
        svarType: formData.svarType!!,
        svarTekst: formData.begrunnelse,
      });
    }
  };

  const handleChangeSvarType = (newValue: string) => {
    setFormData({ svarType: newValue as SvarType, begrunnelse: "" });
    setError([]);
  };

  const handleChangeBegrunnelse = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      svarType: formData.svarType,
      begrunnelse: e.target.value,
    });
    validateForm();
  };

  const isFieldError = (field: InputFieldType): boolean => {
    return !!error.find((err) => err.inputField === field);
  };

  return (
    <SvarStyled title={texts.title}>
      {error.length > 0 && (
        <ErrorSummary heading={texts.feiloppsummeringTittel}>
          {error.map((error, index) => {
            return (
              <ErrorSummary.Item key={index} href={`#${error.inputField}`}>
                {error.errorMsg}
              </ErrorSummary.Item>
            );
          })}
        </ErrorSummary>
      )}

      <RadioGroup
        id={inputFields.svarType}
        legend={texts.svarLegend}
        error={
          isFieldError(inputFields.svarType) ? texts.svarRequired : undefined
        }
        onChange={handleChangeSvarType}
      >
        <Radio value="KOMMER">{texts.svarKommer}</Radio>
        <Radio value="NYTT_TID_STED">{texts.svarEndring}</Radio>
        <Radio value="KOMMER_IKKE">{texts.svarAvlysning}</Radio>
      </RadioGroup>

      {formData.svarType === "NYTT_TID_STED" && (
        <>
          <Alert variant="info">
            <BodyLong>{texts.infoEndring}</BodyLong>
          </Alert>

          <Textarea
            id={inputFields.begrunnelseEndring}
            label={texts.begrunnelseEndringLabel}
            description={begrunnelseDescriptionSmallText}
            maxLength={300}
            error={isFieldError(inputFields.begrunnelseEndring)}
            onChange={handleChangeBegrunnelse}
            value={formData.begrunnelse}
          />
        </>
      )}

      {formData.svarType === "KOMMER_IKKE" && (
        <>
          <Alert variant="info">
            <BodyLong>{texts.infoAvlysning}</BodyLong>
          </Alert>
          <Textarea
            id={inputFields.begrunnelseAvlysning}
            label={texts.begrunnelseAvlysningLabel}
            description={begrunnelseDescriptionSmallText}
            maxLength={300}
            error={isFieldError(inputFields.begrunnelseAvlysning)}
            onChange={handleChangeBegrunnelse}
            value={formData.begrunnelse}
          />
        </>
      )}

      {sendSvarQuery.isError && (
        <Alert variant="error">{texts.errorMessage}</Alert>
      )}

      <KnappStyled
        disabled={sendSvarQuery.isLoading}
        loading={sendSvarQuery.isLoading}
        onClick={validateAndSubmit}
      >
        {texts.sendSvar}
      </KnappStyled>
    </SvarStyled>
  );
};

export default GiSvarPaInnkallelseB;
