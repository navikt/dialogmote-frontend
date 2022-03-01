import React from "react";
import { BodyLong, Heading, Label } from "@navikt/ds-react";
import { texts as MeldBehovTextsSM } from "../../../pages/sykmeldt/motebehov/meld";
import { texts as MeldBehovTextsAG } from "../../../pages/arbeidsgiver/[narmestelederid]/motebehov/meld";
import { Motebehov } from "@/server/data/types/internal/MotebehovTypes";
import { getFullDateFormat } from "@/common/utils/dateUtils";
import { CapitalizedLabel } from "@/common/components/label/CapitalizedLabel";

const texts = {
  heading: "Svaret ditt om behov for møte",
  harBehov: "Jeg har behov for et møte med NAV.",
  harIkkeBehov: "Jeg har ikke behov for et møte med NAV.",
  begrunnelse: "Begrunnelse",
};

interface Props {
  motebehov: Motebehov;
}

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
