import React from "react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import { Checkbox, CheckboxGroup, Ingress, Textarea } from "@navikt/ds-react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { MotebehovErrorSummary } from "@/common/components/motebehov/MotebehovErrorSummary";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { Controller, useForm } from "react-hook-form";
import { useErrorSummaryFormatter } from "@/common/hooks/useErrorSummaryFormatter";

const begrunnelseMaxLength = 1000;

const motebehovCheckbox = "motebehovCheckbox";
const behandlerCheckbox = "behandlerCheckbox";
const begrunnelseTextArea = "begrunnelseTextArea";

type FormValues = {
  [motebehovCheckbox]: boolean;
  [behandlerCheckbox]: boolean;
  [begrunnelseTextArea]: string;
};

interface Props {
  motebehovTekst: string;
  behandlerVaereMedTekst: string;
  sensitivInfoTekst: string;
  meldMotebehov: (svar: MotebehovSvarRequest) => void;
  isLoading: boolean;
}

export const MeldBehovContent = ({
  motebehovTekst,
  behandlerVaereMedTekst,
  sensitivInfoTekst,
  meldMotebehov,
  isLoading,
}: Props) => {
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
    const behandlerBliMedTekst = !!behandlerCheckbox
      ? behandlerVaereMedTekst
      : "";

    meldMotebehov({
      harMotebehov: !!motebehovCheckbox,
      forklaring: `${behandlerBliMedTekst}${begrunnelseTextArea}`,
    });
    trackEvent(Events.SendMeldBehov);
  }

  return (
    <>
      <Ingress spacing>
        Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.
      </Ingress>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogmotePanel>
          <MotebehovErrorSummary errors={errorList} />

          <CheckboxGroup legend="Meld behov for møte" hideLegend>
            <Controller
              name={motebehovCheckbox}
              control={control}
              rules={{
                required:
                  "Du må krysse av for møtebehov for å kunne sende inn skjemaet.",
              }}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  id={motebehovCheckbox}
                  value={motebehovTekst}
                  error={!!errors[motebehovCheckbox]}
                >
                  {motebehovTekst}
                </Checkbox>
              )}
            />
            <Controller
              name={behandlerCheckbox}
              control={control}
              render={({ field }) => (
                <Checkbox {...field} value={behandlerVaereMedTekst}>
                  {behandlerVaereMedTekst}
                </Checkbox>
              )}
            />
          </CheckboxGroup>

          <Controller
            name={begrunnelseTextArea}
            control={control}
            rules={{
              maxLength: {
                value: begrunnelseMaxLength,
                message: `Maks ${begrunnelseMaxLength} tegn er tillatt.`,
              },
            }}
            render={({ field }) => (
              <Textarea
                {...field}
                id={begrunnelseTextArea}
                label="Begrunnelse (valgfri)"
                description={sensitivInfoTekst}
                maxLength={begrunnelseMaxLength}
                minRows={4}
                error={errors[begrunnelseTextArea]?.message}
              />
            )}
          />

          <div className="inline-flex pt-4 gap-4">
            <SubmitButton isLoading={isLoading} />
            <CancelButton />
          </div>
        </DialogmotePanel>
      </form>
    </>
  );
};
