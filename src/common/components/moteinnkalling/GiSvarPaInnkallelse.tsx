import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { Control, Controller, useForm } from "react-hook-form";
import {
  Alert,
  BodyLong,
  Button,
  ErrorSummary,
  Radio,
  RadioGroup,
  Textarea,
} from "@navikt/ds-react";
import { SvarRespons, SvarType } from "@/server/data/types/external/BrevTypes";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import { useSvarPaInnkallelse } from "@/common/api/queries/brevQueries";

const SvarStyled = styled(DialogmotePanel)`
  margin-top: 2rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const KnappStyled = styled(Button)`
  width: fit-content;
`;

const texts = {
  title: "Svar om du kan komme",
  info: "Det er et krav om at du deltar i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? Be om endring.",
  infoRequired: "Alle felt er obligatoriske.",
  svarLegend: "Svar på innkallingen",
  svarRequired: "Du må velge et svar",
  svarKommer: "Jeg kommer",
  svarEndring: "Jeg ønsker å endre tidspunkt eller sted",
  svarAvlysning: "Jeg ønsker å avlyse",
  infoEndring: `NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.\n\nHusk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`,
  infoAvlysning: `NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.\n\nSelv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig. Husk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`,
  begrunnelseRequired: "Begrunnelse er obligatorisk",
  begrunnelseMaxLength: "Begrunnelse kan ikke være lenger enn 300 tegn",
  begrunnelseEndringLabel: "Hvorfor ønsker du å endre tidspunkt eller sted?",
  begrunnelseAvlysningLabel: "Hvorfor ønsker du å avlyse?",
  begrunnelseDescription:
    "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
  feiloppsummeringTittel: "For å gå videre må du rette opp følgende:",
  errorMessage: "Svaret ditt kom ikke frem. Kan du prøve igjen?",
};

const fields = {
  SVAR: "svar",
  BEGRUNNELSE_ENDRING: "begrunnelseEndring",
  BEGRUNNELSE_AVLYSNING: "begrunnelseAvlysning",
};

interface BegrunnelseProps {
  control: Control;
  name: string;
  label: string;
  error: string;
}

const BegrunnelseInput = ({
  control,
  name,
  label,
  error,
}: BegrunnelseProps): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      rules={{
        required: texts.begrunnelseRequired,
        maxLength: { value: 300, message: texts.begrunnelseMaxLength },
      }}
      render={({ field }) => (
        <Textarea
          id={name}
          {...field}
          label={label}
          description={texts.begrunnelseDescription}
          maxLength={300}
          error={error}
        />
      )}
    />
  );
};

interface Props {
  brevUuid: string;
}

const GiSvarPaInnkallelse = ({ brevUuid }: Props): ReactElement => {
  const svarPaInnkallelse = useSvarPaInnkallelse(brevUuid);
  const {
    register,
    watch,
    formState,
    handleSubmit,
    getValues,
    control,
    clearErrors,
  } = useForm();
  const { errors } = formState;
  const watchSvar = watch(fields.SVAR, false);
  console.log(watch(fields.SVAR));

  const { trackEvent } = useAmplitude();

  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === fields.SVAR) {
  //       clearErrors();
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, clearErrors]);

  const sendSvar = (): void => {
    const selectedSvar = getValues(fields.SVAR);
    const svar: SvarRespons = {
      svarType: selectedSvar,
      ...begrunnelse(selectedSvar),
    };
    svarPaInnkallelse.mutate(svar);
  };

  const begrunnelse = (
    selectedSvar: SvarType
  ): { svarTekst: string } | undefined => {
    switch (selectedSvar) {
      case "NYTT_TID_STED":
        return { svarTekst: getValues(fields.BEGRUNNELSE_ENDRING) };
      case "KOMMER_IKKE":
        return { svarTekst: getValues(fields.BEGRUNNELSE_AVLYSNING) };
    }
    return undefined;
  };

  const feil = Object.keys(errors)
    .filter((key) => errors[key])
    .map((key) => {
      return {
        skjemaelementId: key,
        feilmelding: errors[key].message,
      };
    });

  return (
    <SvarStyled title={texts.title}>
      <BodyLong>{texts.info}</BodyLong>
      <BodyLong>{texts.infoRequired}</BodyLong>
      <FormStyled onSubmit={handleSubmit(sendSvar)}>
        <RadioGroup legend={texts.svarLegend} error={errors.svar?.message}>
          <Radio
            {...register(fields.SVAR, { required: texts.svarRequired })}
            value={"KOMMER"}
          >
            {texts.svarKommer}
          </Radio>
          <Radio
            {...register(fields.SVAR, { required: texts.svarRequired })}
            value={"NYTT_TID_STED"}
          >
            {texts.svarEndring}
          </Radio>
          <Radio
            {...register(fields.SVAR, { required: texts.svarRequired })}
            value={"KOMMER_IKKE"}
          >
            {texts.svarAvlysning}
          </Radio>
        </RadioGroup>

        {/*{watchSvar == "NYTT_TID_STED" && (*/}
        {/*  <>*/}
        {/*    <Alert variant="warning">*/}
        {/*      <BodyLong>{texts.infoEndring}</BodyLong>*/}
        {/*    </Alert>*/}
        {/*    <BegrunnelseInput*/}
        {/*      control={control}*/}
        {/*      name={fields.BEGRUNNELSE_ENDRING}*/}
        {/*      error={errors.begrunnelseEndring?.message}*/}
        {/*      label={texts.begrunnelseEndringLabel}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*)}*/}

        {/*{watchSvar == "KOMMER_IKKE" && (*/}
        {/*  <>*/}
        {/*    <Alert variant="warning">*/}
        {/*      <BodyLong>{texts.infoAvlysning}</BodyLong>*/}
        {/*    </Alert>*/}
        {/*    <BegrunnelseInput*/}
        {/*      control={control}*/}
        {/*      name={fields.BEGRUNNELSE_AVLYSNING}*/}
        {/*      error={errors.begrunnelseAvlysning?.message}*/}
        {/*      label={texts.begrunnelseAvlysningLabel}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*)}*/}

        {!!feil.length && (
          <ErrorSummary heading={texts.feiloppsummeringTittel}>
            {feil.map((err, index) => {
              return (
                <ErrorSummary.Item key={index} href={err.skjemaelementId}>
                  {err.feilmelding}
                </ErrorSummary.Item>
              );
            })}
          </ErrorSummary>
        )}

        {svarPaInnkallelse.isError && (
          <Alert variant="error">{texts.errorMessage}</Alert>
        )}

        <KnappStyled
          disabled={svarPaInnkallelse.isLoading}
          spinner={svarPaInnkallelse.isLoading}
          onClick={() =>
            trackEvent(Events.SendSvarPaInnkallelse, {
              // svarAlternativ: watchSvar,
            })
          }
        >
          Send svar
        </KnappStyled>
      </FormStyled>
    </SvarStyled>
  );
};

export default GiSvarPaInnkallelse;
