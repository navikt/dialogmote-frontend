import React from "react";
import { DialogMotebehov } from "@/server/data/types/internal/DialogMotebehovTypes";
import { BodyLong, Heading, Label } from "@navikt/ds-react";
import { texts as MeldBehovTextsSM } from "../../../pages/sykmeldt/motebehov/meld";
import { texts as MeldBehovTextsAG } from "../../../pages/arbeidsgiver/[narmestelederid]/motebehov/meld";
import styled from "styled-components";

const texts = {
  heading: "Svaret ditt om behov for møte",
  harBehov: "Jeg har behov for et møte med NAV.",
  harIkkeBehov: "Jeg har ikke behov for et møte med NAV.",
  begrunnelse: "Begrunnelse",
};

interface Props {
  motebehov: DialogMotebehov;
}

export const getFullDateFormat = (date: string | number | Date) => {
  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObject.toLocaleDateString("nb-NO", options);
};

const CapitalizedLabel = styled(Label)`
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const MotebehovKvittering = ({ motebehov }: Props) => {
  const behandlerVaereMedTekst =
    motebehov.skjemaType === "MELD_BEHOV"
      ? MeldBehovTextsSM.behandlerVaereMedTekst
      : MeldBehovTextsAG.behandlerVaereMedTekst;

  const onskerAtBehandlerBlirMed = motebehov.svar?.forklaring?.includes(
    behandlerVaereMedTekst
  );

  const begrunnelseTekst = motebehov.svar?.forklaring?.replace(
    behandlerVaereMedTekst,
    ""
  );

  return (
    <>
      <Heading spacing level="2" size="medium">
        {texts.heading}
      </Heading>

      {motebehov.svar?.opprettetDato && (
        <CapitalizedLabel spacing>
          {getFullDateFormat(motebehov.svar?.opprettetDato)}
        </CapitalizedLabel>
      )}

      <BodyLong spacing={!onskerAtBehandlerBlirMed}>
        {motebehov.svar?.harMotebehov ? texts.harBehov : texts.harIkkeBehov}
      </BodyLong>

      {onskerAtBehandlerBlirMed && (
        <BodyLong spacing>
          {behandlerVaereMedTekst.replace(" (valgfri)", "")}
        </BodyLong>
      )}

      {begrunnelseTekst && (
        <>
          <Label spacing>{texts.begrunnelse}</Label>
          <BodyLong>{begrunnelseTekst}</BodyLong>
        </>
      )}
    </>
  );
};

export default MotebehovKvittering;
