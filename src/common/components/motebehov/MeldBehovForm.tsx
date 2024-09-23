import { Controller, useForm } from "react-hook-form";
import { BodyLong, Checkbox, CheckboxGroup, Textarea } from "@navikt/ds-react";

import { useAmplitude } from "@/common/hooks/useAmplitude";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { MotebehovErrorSummary } from "@/common/components/motebehov/MotebehovErrorSummary";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { Events } from "@/common/amplitude/events";
import { useErrorSummaryFormatter } from "@/common/hooks/useErrorSummaryFormatter";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { commonTexts } from "@/common/constants/commonTexts";

const BEGRUNNELSE_MAX_LENGTH = 1000;

const texts = {
  aboutRequiredFields:
    "Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.",
  formLabels: {
    checkboxesLegend: "Meld behov for møte",
    textAreaBegrunnelse: "Begrunnelse (valgfri)",
  },
  validation: {
    requiredHarBehovCheckbox:
      "Du må krysse av for møtebehov for å kunne sende inn skjemaet.",
    mustAnswerYesOrNo:
      "Du må velge ja eller nei for å kunne sende inn skjemaet.",
    maxLengthBegrunnelse: `Maks ${BEGRUNNELSE_MAX_LENGTH} tegn er tillatt.`,
  },
  buttonSendInn: "Send inn",
};

const motebehovCheckbox = "motebehovCheckbox";
const behandlerCheckbox = "behandlerCheckbox";
const begrunnelseTextArea = "begrunnelseTextArea";

type FormValues = {
  [motebehovCheckbox]: boolean;
  [behandlerCheckbox]: boolean;
  [begrunnelseTextArea]: string;
};

interface Props {
  checkboxLabelHarBehov: string;
  checkboxLabelOnskerAtBehandlerBlirMed: string;
  isSubmitting: boolean;
  onSubmitForm: (svar: MotebehovSvarRequest) => void;
}

function MeldBehovForm({
  checkboxLabelHarBehov,
  checkboxLabelOnskerAtBehandlerBlirMed,
  isSubmitting,
  onSubmitForm,
}: Props) {
  const { trackEvent } = useAmplitude();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const errorList = useErrorSummaryFormatter(errors);

  function onSubmit({
    behandlerCheckbox,
    motebehovCheckbox,
    begrunnelseTextArea,
  }: FormValues) {
    const forklaring = !!behandlerCheckbox
      ? `${checkboxLabelOnskerAtBehandlerBlirMed} ${begrunnelseTextArea}`
      : begrunnelseTextArea;

    onSubmitForm({
      harMotebehov: !!motebehovCheckbox,
      forklaring,
    });
    trackEvent(Events.SendMeldBehov);
  }

  return (
    <>
      <BodyLong size="medium" spacing>
        {texts.aboutRequiredFields}
      </BodyLong>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogmotePanel>
          <MotebehovErrorSummary errors={errorList} />

          <CheckboxGroup legend={texts.formLabels.checkboxesLegend} hideLegend>
            <Controller
              name={motebehovCheckbox}
              control={control}
              rules={{
                required: texts.validation.requiredHarBehovCheckbox,
              }}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  id={motebehovCheckbox}
                  value={checkboxLabelHarBehov}
                  error={!!errors[motebehovCheckbox]}
                >
                  {checkboxLabelHarBehov}
                </Checkbox>
              )}
            />

            <Controller
              name={behandlerCheckbox}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  value={checkboxLabelOnskerAtBehandlerBlirMed}
                >
                  {checkboxLabelOnskerAtBehandlerBlirMed}
                </Checkbox>
              )}
            />
          </CheckboxGroup>

          <Controller
            name={begrunnelseTextArea}
            control={control}
            rules={{
              maxLength: {
                value: BEGRUNNELSE_MAX_LENGTH,
                message: texts.validation.maxLengthBegrunnelse,
              },
            }}
            render={({ field }) => (
              <Textarea
                {...field}
                id={begrunnelseTextArea}
                label={texts.formLabels.textAreaBegrunnelse}
                description={commonTexts.noSensitiveInfo}
                maxLength={BEGRUNNELSE_MAX_LENGTH}
                minRows={4}
                error={errors[begrunnelseTextArea]?.message}
              />
            )}
          />

          <div className="inline-flex pt-4 gap-4">
            <SubmitButton
              isLoading={isSubmitting}
              label={texts.buttonSendInn}
            />
            <CancelButton />
          </div>
        </DialogmotePanel>
      </form>
    </>
  );
}

export default MeldBehovForm;
