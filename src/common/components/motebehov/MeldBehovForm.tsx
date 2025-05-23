import { Controller, useForm } from "react-hook-form";
import { Checkbox, Textarea, TextField } from "@navikt/ds-react";

import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { MotebehovErrorSummary } from "@/common/components/motebehov/MotebehovErrorSummary";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { useErrorSummaryFormatter } from "@/common/hooks/useErrorSummaryFormatter";
import { commonTexts } from "@/common/constants/commonTexts";
import { commonTextsForSvarAndMeld } from "./SvarBehovForm";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import {
  FieldSnapshot,
  FormSnapshotRequestDto,
  MotebehovFormIdentifier,
} from "@/server/service/schema/formSnapshotSchema";

const MAX_LENGTH_BEHOV_BEGRUNNELSE = 1000;
const MAX_LENGTH_ONSKER_BEHANDLER_BEGRUNNELSE = 500;
const MAX_LENGTH_HVA_SLAGS_TOLK = 100;

const texts = {
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

const behovBegrunnelseTextArea = "begrunnelseText";
const onskerBehandlerCheckbox = "onskerSykmelderDeltarCheckbox";
const onskerBehandlerBegrunnelseTextArea =
  "onskerSykmelderDeltarBegrunnelseText";
const harBehovForTolkCheckbox = "onskerTolkCheckbox";
const hvaSlagsTolkTextField = "tolkSprakText";

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
  formIdentifier: MotebehovFormIdentifier;
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
  formIdentifier,
}: Props) {
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

  function onSubmit(data: FormValues) {
    const fieldSnapshots: FieldSnapshot[] = [];

    fieldSnapshots.push({
      fieldId: behovBegrunnelseTextArea,
      label: begrunnelseLabel,
      fieldType: "TEXT",
      value: data[behovBegrunnelseTextArea],
      description: begrunnelseDescriptionWithNoSensitiveInfoText,
    });

    fieldSnapshots.push({
      fieldType: "CHECKBOX_SINGLE",
      fieldId: onskerBehandlerCheckbox,
      label: checkboxOnskerBehandlerLabel,
      value: data[onskerBehandlerCheckbox],
    });

    if (isOnskerBehandlerDeltarChecked) {
      fieldSnapshots.push({
        fieldType: "TEXT",
        fieldId: onskerBehandlerBegrunnelseTextArea,
        label:
          commonTextsForSvarAndMeld.formLabels
            .onskerBehandlerMedBegrunnelseLabel,
        wasRequired: true,
        value: data[onskerBehandlerBegrunnelseTextArea],
      });
    }

    fieldSnapshots.push({
      fieldType: "CHECKBOX_SINGLE",
      fieldId: harBehovForTolkCheckbox,
      label: checkboxHarBehovForTolkLabel,
      value: data[harBehovForTolkCheckbox],
    });

    if (isHarBehovForTolkChecked) {
      fieldSnapshots.push({
        fieldType: "TEXT",
        fieldId: hvaSlagsTolkTextField,
        label: hvaSlagsTolkLabel,
        wasRequired: true,
        value: data[hvaSlagsTolkTextField],
        description:
          commonTextsForSvarAndMeld.formLabels.hvaSlagsTolkDescription,
      });
    }

    const formSnapshotDto: FormSnapshotRequestDto = {
      formIdentifier: formIdentifier,
      formSemanticVersion: "1.0.0",
      fieldSnapshots: fieldSnapshots,
    };

    onSubmitForm({ harMotebehov: true, formSnapshot: formSnapshotDto });
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

        <Controller
          name={onskerBehandlerCheckbox}
          control={control}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value}>
              {checkboxOnskerBehandlerLabel}
            </Checkbox>
          )}
          defaultValue={false}
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
            <Checkbox {...field} checked={field.value}>
              {checkboxHarBehovForTolkLabel}
            </Checkbox>
          )}
          defaultValue={false}
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
            defaultValue={""}
          />
        )}

        <div className="inline-flex pt-4 gap-4">
          <SubmitButton isLoading={isSubmitting} label={texts.buttonSendInn} />
          <CancelButton />
        </div>
      </DialogmotePanel>
    </form>
  );
}

export default MeldBehovForm;
