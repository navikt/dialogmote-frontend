import { Controller, useForm } from "react-hook-form";
import { Checkbox, CheckboxGroup, Textarea, TextField } from "@navikt/ds-react";

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

const texts = {
  aboutRequiredFields:
    "Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.",
  formLabels: {
    checkboxesLegend: "Andre valg",
    onskerBehandlerMedBegrunnelseLabel:
      "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    checkboxBehovForTolkLabel: "Vi har behov for tolk.",
    hvaSlagsTolkLabel: "Hva slags tolk har dere behov for? (Må fylles ut)",
    hvaSlagsTolkDescription: "For eksempel polsk eller tegnspråk.",
  },
  validation: {
    requiredBegrunnelse: "Du må oppgi hvorfor du ønsker et dialogmøte.",
    maxLengthTextAreas: `Maks ${MAX_LENGTH_TEXT_AREAS} tegn er tillatt.`,
    requiredBegrunnelseOnskerBehandlerTextArea:
      "Du må begrunne hvorfor du ønsker at behandler deltar.",
    requiredHvaSlagsTolkTextField:
      "Du må oppgi hva slags tolk dere har behov for.",
  },
  buttonSendInn: "Be om møte",
};

const begrunnelseTextArea = "begrunnelseTextArea";
const behandlerCheckbox = "behandlerCheckbox";
const behandlerBegrunnelseTextArea = "onskerBehandlerBegrunnelseTextArea";
const tolkCheckbox = "tolkCheckbox";
const hvaSlagsTolkTextField = "hvaSlagsgTolkTextField";

type FormValues = {
  [begrunnelseTextArea]: string;
  [behandlerCheckbox]: boolean;
  [behandlerBegrunnelseTextArea]: string;
  [tolkCheckbox]: boolean;
  [hvaSlagsTolkTextField]: string;
};

interface FormLabelProps {
  begrunnelseLabel: string;
  begrunnelseDescription?: string;
  checkboxOnskerBehandlerMedLabel: string;
}

interface Props {
  formLabels: FormLabelProps;
  isSubmitting: boolean;
  onSubmitForm: (svar: MotebehovSvarRequest) => void;
}

function MeldBehovForm({
  formLabels: {
    begrunnelseLabel,
    begrunnelseDescription,
    checkboxOnskerBehandlerMedLabel,
  },
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

  const errorList = useErrorSummaryFormatter(errors);

  const isOnskerBehandlerDeltarChecked = watch(behandlerCheckbox);
  const isHarBehovForTolkChecked = watch(tolkCheckbox);

  const begrunnelseDescriptionWithNoSensitiveInfoText = begrunnelseDescription
    ? `${begrunnelseDescription} ${commonTexts.noSensitiveInfo}`
    : commonTexts.noSensitiveInfo;

  function onSubmit({
    begrunnelseTextArea,
    behandlerCheckbox,
  }: // TODO: Submit these fields as well
  // onskerBehandlerBegrunnelseTextArea,
  // tolkCheckbox,
  // hvaSlagsgTolkTextField,
  FormValues) {
    const forklaring = !!behandlerCheckbox
      ? `${texts.formLabels.onskerBehandlerMedBegrunnelseLabel} ${begrunnelseTextArea}`
      : begrunnelseTextArea;

    onSubmitForm({
      harMotebehov: true,
      forklaring,
    });
    trackEvent(Events.SendMeldBehov);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogmotePanel>
        <MotebehovErrorSummary errors={errorList} />

        <Controller
          name={begrunnelseTextArea}
          control={control}
          rules={{
            required: texts.validation.requiredBegrunnelse,
            maxLength: {
              value: MAX_LENGTH_TEXT_AREAS,
              message: texts.validation.maxLengthTextAreas,
            },
          }}
          render={({ field }) => (
            <Textarea
              {...field}
              id={begrunnelseTextArea}
              label={begrunnelseLabel}
              description={begrunnelseDescriptionWithNoSensitiveInfoText}
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
          <SubmitButton isLoading={isSubmitting} label={texts.buttonSendInn} />
          <CancelButton />
        </div>
      </DialogmotePanel>
    </form>
  );
}

export default MeldBehovForm;
