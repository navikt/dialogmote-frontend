import React, { ReactElement } from "react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import {
  Alert,
  BodyLong,
  Ingress,
  Link,
  Radio,
  RadioGroup,
  Textarea,
} from "@navikt/ds-react";
import { DIALOGMOTE_INFO_URL } from "@/common/constants/staticUrls";
import { HuskOppfolgingsplanGuidePanel } from "@/common/components/motebehov/HuskOppfolgingsplanGuidePanel";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { MotebehovErrorSummary } from "@/common/components/motebehov/MotebehovErrorSummary";
import { SubmitButton } from "@/common/components/button/SubmitButton";
import { CancelButton } from "@/common/components/button/CancelButton";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { Controller, useForm } from "react-hook-form";
import { useErrorSummaryFormatter } from "@/common/hooks/useErrorSummaryFormatter";
import { useAudience } from "@/common/hooks/routeHooks";

const begrunnelseMaxLength = 1000;

const texts = {
  dialogmoteInfo:
    "Ifølge folketrygdloven skal NAV innkalle til dialogmøte senest innen 26 ukers sykefravær, med mindre det er åpenbart unødvendig. Vi bruker opplysningene du gir her til å vurdere om det er behov for møte. ",
  svarNeiAlert:
    "Selv om du svarer nei, kan det hende vi likevel kommer til at det er nødvendig med et møte. Svaret ditt brukes når vi vurderer behovet.",
};

const hasMotebehovRadio = "hasMotebehovRadio";
const motebehovRadioGroup = "motebehovRadioGroup";
const begrunnelseTextArea = "begrunnelseTextArea";

type FormValues = {
  [hasMotebehovRadio]: boolean;
  [motebehovRadioGroup]: "Ja" | "Nei" | null;
  [begrunnelseTextArea]: string;
};

interface Props {
  begrunnelseDescription: string;
  motebehovQuestionText: string;
  svarMotebehov: (svar: MotebehovSvarRequest) => void;
  isSubmitting: boolean;
}

export const SvarBehovContent = ({
  begrunnelseDescription,
  motebehovQuestionText,
  svarMotebehov,
  isSubmitting,
}: Props): ReactElement => {
  const { trackEvent } = useAmplitude();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormValues>();
  const errorList = useErrorSummaryFormatter(errors);
  const { isAudienceSykmeldt } = useAudience();

  const isNeiSelected = watch(motebehovRadioGroup) === "Nei";

  function onSubmit({ motebehovRadioGroup, begrunnelseTextArea }: FormValues) {
    svarMotebehov({
      harMotebehov: motebehovRadioGroup === "Ja",
      forklaring: begrunnelseTextArea,
    });
    trackEvent(Events.SendSvarBehov);
  }

  return (
    <>
      <Ingress spacing>
        {texts.dialogmoteInfo}
        <Link href={DIALOGMOTE_INFO_URL}>Les om dialogmøte.</Link>
      </Ingress>

      {!isAudienceSykmeldt && <HuskOppfolgingsplanGuidePanel />}

      <BodyLong spacing>
        Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.
      </BodyLong>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogmotePanel>
          <MotebehovErrorSummary errors={errorList} />

          <Controller
            name={motebehovRadioGroup}
            rules={{
              required:
                "Du må velge ja eller nei for å kunne sende inn skjemaet.",
            }}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <RadioGroup
                {...field}
                id={motebehovRadioGroup}
                legend={motebehovQuestionText}
                error={errors[motebehovRadioGroup]?.message}
              >
                <Radio value="Ja">Ja, jeg mener det er behov for et møte</Radio>
                <Radio value="Nei">
                  Nei, jeg mener det ikke er behov for et møte
                </Radio>
              </RadioGroup>
            )}
          />

          {isNeiSelected && <Alert variant="info">{texts.svarNeiAlert}</Alert>}

          <Controller
            name={begrunnelseTextArea}
            control={control}
            rules={{
              maxLength: {
                value: begrunnelseMaxLength,
                message: `Maks ${begrunnelseMaxLength} tegn er tillatt.`,
              },
              ...(isNeiSelected && {
                required:
                  "Du må legge inn begrunnelse dersom du mener det ikke er behov for møte.",
              }),
            }}
            render={({ field }) => (
              <Textarea
                {...field}
                id={begrunnelseTextArea}
                label={`Begrunnelse${isNeiSelected ? "" : " (valgfri)"}`}
                description={begrunnelseDescription}
                maxLength={begrunnelseMaxLength}
                minRows={4}
                error={errors[begrunnelseTextArea]?.message}
              />
            )}
          />

          <div className="inline-flex pt-4 gap-4">
            <SubmitButton isLoading={isSubmitting} />
            <CancelButton />
          </div>
        </DialogmotePanel>
      </form>
    </>
  );
};
