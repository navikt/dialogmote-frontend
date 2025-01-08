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
import { commonTextsForSvarAndMeld } from "./SvarBehovForm";

const MAX_LENGTH_BEHOV_BEGRUNNELSE = 1000;
const MAX_LENGTH_ONSKER_BEHANDLER_BEGRUNNELSE = 500;
const MAX_LENGTH_HVA_SLAGS_TOLK = 100;

const texts = {
  formLabels: {
    checkboxesLegend: "Andre valg",
  },
  validation: {
    requiredBehovBegrunnelse: "Du må oppgi hvorfor du ønsker et dialogmøte.",
    maxLengthBehovBegrunnelse: `Maks ${MAX_LENGTH_BEHOV_BEGRUNNELSE} tegn er tillatt i dette feltet.`,
    requiredOnskerBehandlerBegrunnelse:
      "Du må begrunne hvorfor du ønsker at behandler deltar.",
    maxLengthOnskerBehandlerBegrunnelse: `Maks ${MAX_LENGTH_ONSKER_BEHANDLER_BEGRUNNELSE} tegn er tillatt i dette feltet.`,
    requiredHvaSlagsTolk: "Du må oppgi hva slags tolk dere har behov for.",
  },
  buttonSendInn: "Be om møte",
};

const behovBegrunnelseTextArea = "behovBegrunnelseTextArea";
const onskerBehandlerCheckbox = "onskerBehandlerCheckbox";
const onskerBehandlerBegrunnelseTextArea = "onskerBehandlerBegrunnelseTextArea";
const harBehovForTolkCheckbox = "harBehovForTolkCheckbox";
const hvaSlagsTolkTextField = "hvaSlagsTolkTextField";

type FormValues = {
  [behovBegrunnelseTextArea]: string;
  [onskerBehandlerCheckbox]: boolean;
  [onskerBehandlerBegrunnelseTextArea]: string;
  [harBehovForTolkCheckbox]: boolean;
  [hvaSlagsTolkTextField]: string;
};

interface FormLabelProps {
  begrunnelseLabel: string;
  begrunnelseDescription?: string;
  checkboxOnskerBehandlerLabel: string;
  checkboxHarBehovForTolkLabel: string;
  hvaSlagsTolkLabel: string;
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
    checkboxOnskerBehandlerLabel,
    checkboxHarBehovForTolkLabel,
    hvaSlagsTolkLabel,
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

  const isOnskerBehandlerDeltarChecked = watch(onskerBehandlerCheckbox);
  const isHarBehovForTolkChecked = watch(harBehovForTolkCheckbox);

  const begrunnelseDescriptionWithNoSensitiveInfoText = begrunnelseDescription
    ? `${begrunnelseDescription} ${commonTexts.noSensitiveInfo}`
    : commonTexts.noSensitiveInfo;

  function onSubmit({
    behovBegrunnelseTextArea,
    onskerBehandlerCheckbox,
    onskerBehandlerBegrunnelseTextArea,
    harBehovForTolkCheckbox,
    hvaSlagsTolkTextField,
  }: FormValues) {
    onSubmitForm({
      harMotebehov: true,
      begrunnelse: behovBegrunnelseTextArea,
      onskerAtBehandlerDeltar: onskerBehandlerCheckbox,
      onskerAtBehandlerDeltarBegrunnelse: onskerBehandlerBegrunnelseTextArea,
      harBehovForTolk: harBehovForTolkCheckbox,
      hvaSlagsTolk: hvaSlagsTolkTextField,
    });
    trackEvent(Events.SendMeldBehov);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogmotePanel>
        <MotebehovErrorSummary errors={errorList} />

        <Controller
          name={behovBegrunnelseTextArea}
          control={control}
          rules={{
            required: texts.validation.requiredBehovBegrunnelse,
            maxLength: {
              value: MAX_LENGTH_BEHOV_BEGRUNNELSE,
              message: texts.validation.maxLengthBehovBegrunnelse,
            },
          }}
          render={({ field }) => (
            <Textarea
              {...field}
              id={behovBegrunnelseTextArea}
              label={begrunnelseLabel}
              description={begrunnelseDescriptionWithNoSensitiveInfoText}
              maxLength={MAX_LENGTH_BEHOV_BEGRUNNELSE}
              minRows={4}
              error={errors[behovBegrunnelseTextArea]?.message}
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
          <SubmitButton isLoading={isSubmitting} label={texts.buttonSendInn} />
          <CancelButton />
        </div>
      </DialogmotePanel>
    </form>
  );
}

export default MeldBehovForm;
