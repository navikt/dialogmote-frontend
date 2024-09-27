import { Controller, useForm } from "react-hook-form";
import { Alert, BodyLong, Radio, RadioGroup, Textarea } from "@navikt/ds-react";

import { useAmplitude } from "@/common/hooks/useAmplitude";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { MotebehovErrorSummary } from "@/common/components/motebehov/MotebehovErrorSummary";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { Events } from "@/common/amplitude/events";
import { useErrorSummaryFormatter } from "@/common/hooks/useErrorSummaryFormatter";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { commonTexts } from "@/common/constants/commonTexts";
import { useAudience } from "@/common/hooks/routeHooks";

const BEGRUNNELSE_MAX_LENGTH = 1000;

const texts = {
  aboutRequiredFields:
    "Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.",
  formLabels: {
    legendRadioHarBehovSykmeldt:
      "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
    legendRadioHarBehovArbeidsgiver:
      "Har dere behov for et dialogmøte med NAV?",
    desciptionRadioHarBehovArbeidsgiver:
      "Du svarer på vegne av arbeidsgiver. Den ansatte har fått det samme spørsmålet og svarer på vegne av seg selv.",
    radioYesSykmeldt: "Ja, jeg ønsker et dialogmøte",
    radioYesArbeidsgiver: "Ja, jeg tror vi kan ha nytte av et dialogmøte",
    radioNo: "Nei, jeg mener det ikke er behov for et dialogmøte",
    begrunnelseIfYes: "Begrunnelse (valgfri)",
    begrunnelseIfNo: "Begrunnelse",
  },
  validation: {
    requiredYesOrNo: "Du må velge ja eller nei for å kunne sende inn skjemaet.",
    requiredBegrunnelseIfAnswerNo:
      "Du må legge inn begrunnelse dersom du mener det ikke er behov for møte.",
    maxLengthBegrunnelse: `Maks ${BEGRUNNELSE_MAX_LENGTH} tegn er tillatt.`,
  },
  alertSvarNeiInfo:
    "Selv om du svarer nei, kan det hende vi likevel kommer til at det er nødvendig med et møte. Svaret ditt brukes når vi vurderer behovet.",
  buttonSendSvar: "Send svar",
};

const hasMotebehovRadio = "hasMotebehovRadio";
const motebehovRadioGroup = "motebehovRadioGroup";
const begrunnelseTextArea = "begrunnelseTextArea";
const onskerBehandlerDeltarCheckbox = "onskerBehandlerDeltarCheckbox";
const onskerTolkCheckbox = "tolkCheckbox";

type FormValues = {
  [hasMotebehovRadio]: boolean;
  [motebehovRadioGroup]: "Ja" | "Nei" | null;
  [begrunnelseTextArea]: string;
  [onskerBehandlerDeltarCheckbox]: boolean;
  [onskerTolkCheckbox]: boolean;
};

interface Props {
  isSubmitting: boolean;
  onSubmitForm: (svar: MotebehovSvarRequest) => void;
}

function SvarBehovForm({ isSubmitting, onSubmitForm }: Props) {
  const { trackEvent } = useAmplitude();

  const { isAudienceSykmeldt } = useAudience();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormValues>();

  const isNeiSelected = watch(motebehovRadioGroup) === "Nei";

  const begrunnelseLabel = isNeiSelected
    ? texts.formLabels.begrunnelseIfNo
    : texts.formLabels.begrunnelseIfYes;

  function onSubmit({ motebehovRadioGroup, begrunnelseTextArea }: FormValues) {
    onSubmitForm({
      harMotebehov: motebehovRadioGroup === "Ja",
      forklaring: begrunnelseTextArea,
    });
    trackEvent(Events.SendSvarBehov);
  }

  const errorList = useErrorSummaryFormatter(errors);

  return (
    <>
      <BodyLong spacing>{texts.aboutRequiredFields}</BodyLong>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogmotePanel>
          <MotebehovErrorSummary errors={errorList} />

          <Controller
            name={motebehovRadioGroup}
            rules={{
              required: texts.validation.requiredYesOrNo,
            }}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <RadioGroup
                {...field}
                id={motebehovRadioGroup}
                legend={
                  isAudienceSykmeldt
                    ? texts.formLabels.legendRadioHarBehovSykmeldt
                    : texts.formLabels.legendRadioHarBehovArbeidsgiver
                }
                description={
                  !isAudienceSykmeldt &&
                  "Du svarer på vegne av arbeidsgiver. Den ansatte har fått det samme spørsmålet og svarer på vegne av seg selv."
                }
                error={errors[motebehovRadioGroup]?.message}
              >
                <Radio value="Ja">
                  {isAudienceSykmeldt
                    ? texts.formLabels.radioYesSykmeldt
                    : texts.formLabels.radioYesArbeidsgiver}
                </Radio>
                <Radio value="Nei">{texts.formLabels.radioNo}</Radio>
              </RadioGroup>
            )}
          />

          {isNeiSelected && (
            <Alert variant="info">{texts.alertSvarNeiInfo}</Alert>
          )}

          <Controller
            name={begrunnelseTextArea}
            control={control}
            rules={{
              maxLength: {
                value: BEGRUNNELSE_MAX_LENGTH,
                message: texts.validation.maxLengthBegrunnelse,
              },
              ...(isNeiSelected && {
                required: texts.validation.requiredBegrunnelseIfAnswerNo,
              }),
            }}
            render={({ field }) => (
              <Textarea
                {...field}
                id={begrunnelseTextArea}
                label={begrunnelseLabel}
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
              label={texts.buttonSendSvar}
            />
            <CancelButton />
          </div>
        </DialogmotePanel>
      </form>
    </>
  );
}

export default SvarBehovForm;
