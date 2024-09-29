import React from "react";
import { BodyLong, Heading, Label } from "@navikt/ds-react";
import { texts as MeldBehovTextsSM } from "@/pages/sykmeldt/motebehov/meld.page";
import { texts as MeldBehovTextsAG } from "@/pages/arbeidsgiver/[narmestelederid]/motebehov/meld.page";
import { getFullDateFormat } from "@/common/utils/dateUtils";
import { Motebehov } from "types/shared/motebehov";
import { useAudience } from "@/common/hooks/routeHooks";

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
  const { isAudienceSykmeldt } = useAudience();

  const behandlerVaereMedTekst = isAudienceSykmeldt
    ? MeldBehovTextsSM.formLabels.checkboxOnskerBehandlerMedLabel
    : MeldBehovTextsAG.formLabels.checkboxOnskerBehandlerMedLabel;

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
        <Label className="lowercase first-letter:uppercase" spacing>
          {getFullDateFormat(motebehov.svar?.opprettetDato)}
        </Label>
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
