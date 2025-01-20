import { Controller, useForm } from "react-hook-form";
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Textarea,
  TextField,
} from "@navikt/ds-react";

import { useAmplitude } from "@/common/hooks/useAmplitude";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { MotebehovErrorSummary } from "@/common/components/motebehov/MotebehovErrorSummary";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { Events } from "@/common/amplitude/events";
import { useErrorSummaryFormatter } from "@/common/hooks/useErrorSummaryFormatter";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { commonTexts } from "@/common/constants/commonTexts";

const MAX_LENGTH_SVAR_BEGRUNNELSE = 1000;
const MAX_LENGTH_ONSKER_BEHANDLER_BEGRUNNELSE = 500;
const MAX_LENGTH_HVA_SLAGS_TOLK = 100;

const RADIO_VALUE_YES = "Ja";
const RADIO_VALUE_NO = "Nei";

export const commonTextsForSvarAndMeld = {
  formLabels: {
    onskerBehandlerMedBegrunnelseLabel:
      "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    hvaSlagsTolkDescription: "Oppgi for eksempel et språk eller tegnspråktolk.",
  },
};

const texts = {
  formLabels: {
    svarBegrunnelseLabelRequired: "Begrunnelse (må fylles ut)",
    svarBegrunnelseLabelOptional: "Begrunnelse (valgfri)",
    checkboxesLegend: "Andre valg",
  },
  validation: {
    requiredYesOrNo: "Du må velge ja eller nei for å kunne sende inn skjemaet.",
    requiredSvarBegrunnelse:
      "Du må gi en begrunnelse for hvorfor du svarte ja eller nei.",
    requiredSvarBegrunnelseIfAnswerNo:
      "Du må gi en begrunnelse dersom du mener det ikke er behov for møte.",
    maxLengthSvarBegrunnelse: `Maks ${MAX_LENGTH_SVAR_BEGRUNNELSE} tegn er tillatt i dette feltet.`,
    requiredOnskerBehandlerBegrunnelse:
      "Du må begrunne hvorfor du ønsker at behandler deltar.",
    maxLengthOnskerBehandlerBegrunnelse: `Maks ${MAX_LENGTH_ONSKER_BEHANDLER_BEGRUNNELSE} tegn er tillatt i dette feltet.`,
    requiredHvaSlagsTolk: "Du må oppgi hva slags tolk dere har behov for.",
  },
  alertSvarNeiInfo:
    "Selv om du svarer nei, kan det hende vi likevel kommer til at det er nødvendig med et møte. Svaret ditt brukes når vi vurderer behovet.",
  buttonSendSvar: "Send svar",
};

const motebehovRadioGroup = "motebehovRadioGroup";
const svarBegrunnelseTextArea = "svarBegrunnelseTextArea";
const onskerBehandlerCheckbox = "onskerBehandlerCheckbox";
const onskerBehandlerBegrunnelseTextArea = "onskerBehandlerBegrunnelseTextArea";
const harBehovForTolkCheckbox = "harBehovForTolkCheckbox";
const hvaSlagsTolkTextField = "hvaSlagsTolkTextField";

type FormValues = {
  [motebehovRadioGroup]: typeof RADIO_VALUE_YES | typeof RADIO_VALUE_NO | null;
  [svarBegrunnelseTextArea]: string;
  [onskerBehandlerCheckbox]: boolean;
  [onskerBehandlerBegrunnelseTextArea]: string;
  [harBehovForTolkCheckbox]: boolean;
  [hvaSlagsTolkTextField]: string;
};

interface FormLabelProps {
  radioHarBehovLegend: string;
  radioHarBehovDescription?: string;
  radioYesLabel: string;
  radioNoLabel: string;
  svarBegrunnelseDescriptionIfYes?: string;
  svarBegrunnelseDescriptionIfNo?: string;
  checkboxOnskerBehandlerLabel: string;
  checkboxHarBehovForTolkLabel: string;
  hvaSlagsTolkLabel: string;
}

interface Props {
  formLabels: FormLabelProps;
  isSvarBegrunnelseRequiredAlsoIfYes: boolean;
  isSubmitting: boolean;
  onSubmitForm: (svar: MotebehovSvarRequest) => void;
}

function SvarBehovForm({
  formLabels: {
    radioHarBehovLegend,
    radioHarBehovDescription,
    radioYesLabel: radioYes,
    radioNoLabel: radioNo,
    svarBegrunnelseDescriptionIfYes,
    svarBegrunnelseDescriptionIfNo,
    checkboxOnskerBehandlerLabel,
    checkboxHarBehovForTolkLabel,
    hvaSlagsTolkLabel,
  },
  isSvarBegrunnelseRequiredAlsoIfYes,
  isSubmitting,
  onSubmitForm,
}: Props) {
  const { trackEvent } = useAmplitude();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormValues>();

  const currentMotebehovAnswer = watch(motebehovRadioGroup);
  const isNoSelected = currentMotebehovAnswer === RADIO_VALUE_NO;

  const isOnskerBehandlerDeltarChecked = watch(onskerBehandlerCheckbox);
  const isHarBehovForTolkChecked = watch(harBehovForTolkCheckbox);

  const isSvarBegrunnelseFieldRequired =
    isSvarBegrunnelseRequiredAlsoIfYes || isNoSelected;

  const svarBegrunnelseLabel = isSvarBegrunnelseFieldRequired
    ? texts.formLabels.svarBegrunnelseLabelRequired
    : texts.formLabels.svarBegrunnelseLabelOptional;

  const svarBegrunnelseDescriptionFirstPart = isNoSelected
    ? svarBegrunnelseDescriptionIfNo
    : svarBegrunnelseDescriptionIfYes;

  const svarBegrunnelseDescription = `${
    svarBegrunnelseDescriptionFirstPart
      ? svarBegrunnelseDescriptionFirstPart + " "
      : ""
  }${commonTexts.noSensitiveInfo}`;

  const requiredSvarBegrunnelseValidationText =
    isSvarBegrunnelseRequiredAlsoIfYes
      ? texts.validation.requiredSvarBegrunnelse
      : texts.validation.requiredSvarBegrunnelseIfAnswerNo;

  function onSubmit({
    motebehovRadioGroup,
    svarBegrunnelseTextArea,
  }: FormValues) {
    onSubmitForm({
      harMotebehov: motebehovRadioGroup === RADIO_VALUE_YES,
      forklaring: svarBegrunnelseTextArea,
    });
    trackEvent(Events.SendSvarBehov);
  }

  const errorList = useErrorSummaryFormatter(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogmotePanel>
        <MotebehovErrorSummary errors={errorList} />

        <Controller
          name={motebehovRadioGroup}
          rules={{
            required: {
              value: isSvarBegrunnelseFieldRequired,
              message: texts.validation.requiredYesOrNo,
            },
          }}
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <RadioGroup
              {...field}
              id={motebehovRadioGroup}
              legend={radioHarBehovLegend}
              description={radioHarBehovDescription}
              error={errors[motebehovRadioGroup]?.message}
            >
              <Radio value={RADIO_VALUE_YES}>{radioYes}</Radio>
              <Radio value={RADIO_VALUE_NO}>{radioNo}</Radio>
            </RadioGroup>
          )}
        />

        {/* TODO: Move to receipt part */}
        {/* {isNoSelected && (
            <Alert variant="info">{texts.alertSvarNeiInfo}</Alert>
          )} */}

        {/* <BodyShort>{begrunnelseDescriptionFirstPart}</BodyShort> */}

        <Controller
          name={svarBegrunnelseTextArea}
          control={control}
          rules={{
            maxLength: {
              value: MAX_LENGTH_SVAR_BEGRUNNELSE,
              message: texts.validation.maxLengthSvarBegrunnelse,
            },
            required: {
              value: isSvarBegrunnelseFieldRequired,
              message: requiredSvarBegrunnelseValidationText,
            },
          }}
          render={({ field }) => (
            <Textarea
              {...field}
              id={svarBegrunnelseTextArea}
              label={svarBegrunnelseLabel}
              description={svarBegrunnelseDescription}
              maxLength={MAX_LENGTH_SVAR_BEGRUNNELSE}
              minRows={4}
              error={errors[svarBegrunnelseTextArea]?.message}
            />
          )}
        />

        <CheckboxGroup legend={texts.formLabels.checkboxesLegend} hideLegend>
          <Controller
            name={onskerBehandlerCheckbox}
            control={control}
            render={({ field }) => (
              <Checkbox {...field}>{checkboxOnskerBehandlerLabel}</Checkbox>
            )}
          />

          {isOnskerBehandlerDeltarChecked && (
            <Controller
              name={onskerBehandlerBegrunnelseTextArea}
              control={control}
              rules={{
                maxLength: {
                  value: MAX_LENGTH_ONSKER_BEHANDLER_BEGRUNNELSE,
                  message: texts.validation.maxLengthOnskerBehandlerBegrunnelse,
                },
                required: {
                  value: isOnskerBehandlerDeltarChecked,
                  message: texts.validation.requiredOnskerBehandlerBegrunnelse,
                },
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id={onskerBehandlerBegrunnelseTextArea}
                  label={
                    commonTextsForSvarAndMeld.formLabels
                      .onskerBehandlerMedBegrunnelseLabel
                  }
                  maxLength={MAX_LENGTH_ONSKER_BEHANDLER_BEGRUNNELSE}
                  minRows={4}
                  error={errors[onskerBehandlerBegrunnelseTextArea]?.message}
                  className="mt-3 mb-4"
                />
              )}
            />
          )}

          <Controller
            name={harBehovForTolkCheckbox}
            control={control}
            render={({ field }) => (
              <Checkbox {...field}>{checkboxHarBehovForTolkLabel}</Checkbox>
            )}
          />

          {isHarBehovForTolkChecked && (
            <Controller
              name={hvaSlagsTolkTextField}
              control={control}
              rules={{
                required: {
                  value: isHarBehovForTolkChecked,
                  message: texts.validation.requiredHvaSlagsTolk,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id={hvaSlagsTolkTextField}
                  label={hvaSlagsTolkLabel}
                  description={
                    commonTextsForSvarAndMeld.formLabels.hvaSlagsTolkDescription
                  }
                  maxLength={MAX_LENGTH_HVA_SLAGS_TOLK}
                  error={errors[hvaSlagsTolkTextField]?.message}
                  className="mt-3 mb-2"
                />
              )}
            />
          )}
        </CheckboxGroup>

        <div className="inline-flex pt-4 gap-4">
          <SubmitButton isLoading={isSubmitting} label={texts.buttonSendSvar} />
          <CancelButton />
        </div>
      </DialogmotePanel>
    </form>
  );
}

export default SvarBehovForm;
