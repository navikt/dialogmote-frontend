import { Events } from "@/common/amplitude/events";
import { useSvarPaInnkallelse } from "@/common/api/queries/brevQueries";
import { useAmplitude } from "@/common/hooks/useAmplitude";
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
import { SvarType } from "types/shared/brev";
import { commonTexts } from "@/common/constants/commonTexts";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";

const texts = {
  title: "Gi oss ditt svar",
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

interface Error {
  inputField: InputFieldType;
  errorMsg: string;
}

interface Props {
  brevUuid: string;
}

const GiSvarPaInnkallelse = ({ brevUuid }: Props): ReactElement => {
  const { trackEvent } = useAmplitude();
  const sendSvarQuery = useSvarPaInnkallelse(brevUuid);
  const [error, setError] = useState<Array<Error>>([]);
  const [svarType, setSvartype] = useState<SvarType | undefined>(undefined);
  const [begrunnelse, setBegrunnelse] = useState("");

  useEffect(() => {
    trackEvent(Events.GiSvarPaMoteInnkallingVist);
    // eslint-disable-next-line
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
    <text className="text-base leading-6">{commonTexts.noSensitiveInfo}</text>
  );

  const begrunnelseFieldName: InputFieldType =
    svarType === "KOMMER_IKKE"
      ? inputFields.begrunnelseAvlysning
      : inputFields.begrunnelseEndring;

  const validateForm = (): boolean => {
    if (!svarType) {
      updateError(inputFields.svarType, texts.responseRequired);
      return false;
    }

    if (svarType === "NYTT_TID_STED" || svarType === "KOMMER_IKKE") {
      if (!begrunnelse) {
        updateError(begrunnelseFieldName, texts.begrunnelseRequired);
        return false;
      }
      if (begrunnelse.length > 300) {
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
        // eslint-disable-next-line
        svarAlternativ: svarType!,
      });

      sendSvarQuery.mutate({
        // eslint-disable-next-line
        svarType: svarType!,
        svarTekst: begrunnelse,
      });
    }
  };

  const handleChangeSvarType = (newValue: SvarType) => {
    setSvartype(newValue);
    setBegrunnelse("");
    setError([]);
  };

  const handleChangeBegrunnelse = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setError([]);
    setBegrunnelse(e.target.value);
  };

  const isFieldError = (field: InputFieldType): boolean => {
    return !!error.find((err) => err.inputField === field);
  };

  return (
    <form>
      <DialogmotePanel className="pt-8 flex flex-col" title={texts.title}>
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

        {svarType === "NYTT_TID_STED" && (
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
              value={begrunnelse}
            />
          </>
        )}

        {svarType === "KOMMER_IKKE" && (
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
              value={begrunnelse}
            />
          </>
        )}

        {sendSvarQuery.isError && (
          <Alert variant="error">{texts.errorMessage}</Alert>
        )}

        <Button
          className="w-fit"
          type="submit"
          disabled={sendSvarQuery.isPending}
          loading={sendSvarQuery.isPending}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            validateAndSubmit();
          }}
        >
          {texts.sendSvar}
        </Button>
      </DialogmotePanel>
    </form>
  );
};

export default GiSvarPaInnkallelse;
