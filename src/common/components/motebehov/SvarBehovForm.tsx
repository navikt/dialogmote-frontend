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

const MAX_LENGTH_TEXT_AREAS = 1000;

const RADIO_VALUE_YES = "Ja";
const RADIO_VALUE_NO = "Nei";

const texts = {
  aboutRequiredFields:
    "Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.",
  formLabels: {
    begrunnelseLabelRequiredIfYes: "Begrunnelse (må fylles ut)",
    begrunnelseLabelRequiredIfNo: "Begrunnelse (må fylles ut)",
    begrunnelseLabelOptional: "Begrunnelse (valgfri)",
    checkboxesLegend: "Andre valg",
    onskerBehandlerMedBegrunnelseLabel:
      "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    checkboxBehovForTolkLabel: "Vi har behov for tolk.",
    hvaSlagsTolkLabel: "Hva slags tolk har dere behov for? (Må fylles ut)",
    hvaSlagsTolkDescription: "For eksempel polsk eller tegnspråk.",
  },
  validation: {
    requiredYesOrNo: "Du må velge ja eller nei for å kunne sende inn skjemaet.",
    requiredBegrunnelse:
      "Du må gi en begrunnelse for hvorfor du svarte ja eller nei.",
    requiredBegrunnelseIfAnswerNo:
      "Du må gi en begrunnelse dersom du mener det ikke er behov for møte.",
    maxLengthTextAreas: `Maks ${MAX_LENGTH_TEXT_AREAS} tegn er tillatt.`,
    requiredBegrunnelseOnskerBehandlerTextArea:
      "Du må begrunne hvorfor du ønsker at behandler deltar.",
    requiredHvaSlagsTolkTextField:
      "Du må oppgi hva slags tolk dere har behov for.",
  },
  alertSvarNeiInfo:
    "Selv om du svarer nei, kan det hende vi likevel kommer til at det er nødvendig med et møte. Svaret ditt brukes når vi vurderer behovet.",
  buttonSendSvar: "Send svar",
};

const motebehovRadioGroup = "motebehovRadioGroup";
const begrunnelseTextArea = "begrunnelseTextArea";
const behandlerCheckbox = "behandlerCheckbox";
const behandlerBegrunnelseTextArea = "onskerBehandlerBegrunnelseTextArea";
const tolkCheckbox = "tolkCheckbox";
const hvaSlagsTolkTextField = "hvaSlagsgTolkTextField";

type FormValues = {
  [motebehovRadioGroup]: typeof RADIO_VALUE_YES | typeof RADIO_VALUE_NO | null;
  [begrunnelseTextArea]: string;
  [behandlerCheckbox]: boolean;
  [behandlerBegrunnelseTextArea]: string;
  [tolkCheckbox]: boolean;
  [hvaSlagsTolkTextField]: string;
};

interface FormLabelProps {
  radioHarBehovLegend: string;
  radioHarBehovDescription?: string;
  radioYesLabel: string;
  radioNoLabel: string;
  begrunnelseDescriptionIfYes?: string;
  begrunnelseDescriptionIfNo?: string;
  checkboxOnskerBehandlerMedLabel: string;
}

interface Props {
  formLabels: FormLabelProps;
  isBegrunnelseRequiredAlsoIfYes: boolean;
  isSubmitting: boolean;
  onSubmitForm: (svar: MotebehovSvarRequest) => void;
}

function SvarBehovForm({
  formLabels: {
    radioHarBehovLegend,
    radioHarBehovDescription,
    radioYesLabel: radioYes,
    radioNoLabel: radioNo,
    begrunnelseDescriptionIfYes,
    begrunnelseDescriptionIfNo,
    checkboxOnskerBehandlerMedLabel,
  },
  isBegrunnelseRequiredAlsoIfYes,
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

  const isOnskerBehandlerDeltarChecked = watch(behandlerCheckbox);
  const isHarBehovForTolkChecked = watch(tolkCheckbox);

  const isSvarBegrunnelseFieldRequired =
    isBegrunnelseRequiredAlsoIfYes || isNoSelected;

  const begrunnelseLabel = isSvarBegrunnelseFieldRequired
    ? isNoSelected
      ? texts.formLabels.begrunnelseLabelRequiredIfNo
      : texts.formLabels.begrunnelseLabelRequiredIfYes
    : texts.formLabels.begrunnelseLabelOptional;

  const begrunnelseDescriptionFirstPart = isNoSelected
    ? begrunnelseDescriptionIfNo
    : begrunnelseDescriptionIfYes;

  const begrunnelseDescription = `${
    begrunnelseDescriptionFirstPart ? begrunnelseDescriptionFirstPart + " " : ""
  }${commonTexts.noSensitiveInfo}`;

  const begrunnelseRequiredValidationText = isBegrunnelseRequiredAlsoIfYes
    ? texts.validation.requiredBegrunnelse
    : texts.validation.requiredBegrunnelseIfAnswerNo;

  function onSubmit({ motebehovRadioGroup, begrunnelseTextArea }: FormValues) {
    onSubmitForm({
      harMotebehov: motebehovRadioGroup === RADIO_VALUE_YES,
      forklaring: begrunnelseTextArea,
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
              value: isNoSelected || isBegrunnelseRequiredAlsoIfYes,
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
          name={begrunnelseTextArea}
          control={control}
          rules={{
            maxLength: {
              value: MAX_LENGTH_TEXT_AREAS,
              message: texts.validation.maxLengthTextAreas,
            },
            required: {
              value: isSvarBegrunnelseFieldRequired,
              message: begrunnelseRequiredValidationText,
            },
          }}
          render={({ field }) => (
            <Textarea
              {...field}
              id={begrunnelseTextArea}
              label={begrunnelseLabel}
              description={begrunnelseDescription}
              maxLength={MAX_LENGTH_TEXT_AREAS}
              minRows={4}
              error={errors[begrunnelseTextArea]?.message}
            />
          )}
        />

        <CheckboxGroup legend={texts.formLabels.checkboxesLegend} hideLegend>
          <Controller
            name={behandlerCheckbox}
            control={control}
            render={({ field }) => (
              <Checkbox {...field}>{checkboxOnskerBehandlerMedLabel}</Checkbox>
            )}
          />

          {isOnskerBehandlerDeltarChecked && (
            <Controller
              name={behandlerBegrunnelseTextArea}
              control={control}
              rules={{
                maxLength: {
                  value: MAX_LENGTH_TEXT_AREAS,
                  message: texts.validation.maxLengthTextAreas,
                },
                required: {
                  value: isOnskerBehandlerDeltarChecked,
                  message:
                    texts.validation.requiredBegrunnelseOnskerBehandlerTextArea,
                },
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id={behandlerBegrunnelseTextArea}
                  label={texts.formLabels.onskerBehandlerMedBegrunnelseLabel}
                  maxLength={MAX_LENGTH_TEXT_AREAS}
                  minRows={4}
                  error={errors[behandlerBegrunnelseTextArea]?.message}
                  className="mt-3 mb-4"
                />
              )}
            />
          )}

          <Controller
            name={tolkCheckbox}
            control={control}
            render={({ field }) => (
              <Checkbox {...field}>
                {texts.formLabels.checkboxBehovForTolkLabel}
              </Checkbox>
            )}
          />

          {isHarBehovForTolkChecked && (
            <Controller
              name={hvaSlagsTolkTextField}
              control={control}
              rules={{
                maxLength: {
                  value: MAX_LENGTH_TEXT_AREAS,
                  message: texts.validation.maxLengthTextAreas,
                },
                required: {
                  value: isHarBehovForTolkChecked,
                  message: texts.validation.requiredHvaSlagsTolkTextField,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id={hvaSlagsTolkTextField}
                  label={texts.formLabels.hvaSlagsTolkLabel}
                  description={texts.formLabels.hvaSlagsTolkDescription}
                  maxLength={100}
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
