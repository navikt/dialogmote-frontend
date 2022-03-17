import React, { ReactElement } from "react";
import { Alert, BodyLong, Link } from "@navikt/ds-react";
import styled from "styled-components";
import { KONTAKT_INFO_URL } from "@/common/constants/staticUrls";
import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { SvarType } from "@/server/data/types/external/BrevTypes";

const SuksessStripeStyled = styled(Alert)`
  margin-bottom: 2rem;
`;

const texts = {
  svartKommer: "Du har svart at du kommer til dette dialogmøtet.",
  taKontakt: "Ta kontakt hvis tidspunktet likevel ikke passer.",
  svartVilEndre:
    "Du har svart at du ønsker å endre tidspunkt eller sted for dette dialogmøtet.\n\nNAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.",
  svartKommerIkke:
    "Du har svart at du ønsker å avlyse dette dialogmøtet.\n\nNAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.\n\nSelv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig.",
};

const JegKommer = (): ReactElement => {
  const { trackEvent } = useAmplitude();

  return (
    <SuksessStripeStyled variant="success">
      <BodyLong>{texts.svartKommer}</BodyLong>
      <Link
        href={KONTAKT_INFO_URL}
        onClick={() => trackEvent(Events.KontaktOss)}
      >
        {texts.taKontakt}
      </Link>
    </SuksessStripeStyled>
  );
};

const JegVilEndre = (): ReactElement => {
  return (
    <SuksessStripeStyled variant="success">
      <BodyLong>{texts.svartVilEndre}</BodyLong>
    </SuksessStripeStyled>
  );
};

const JegVilAvlyse = (): ReactElement => {
  return (
    <SuksessStripeStyled variant="success">
      <BodyLong>{texts.svartKommerIkke}</BodyLong>
    </SuksessStripeStyled>
  );
};

interface SvarProps {
  svarType: SvarType;
}

const DittSvarPaInnkallelse = ({
  svarType,
}: SvarProps): ReactElement | null => {
  switch (svarType) {
    case "KOMMER":
      return <JegKommer />;
    case "NYTT_TID_STED":
      return <JegVilEndre />;
    case "KOMMER_IKKE":
      return <JegVilAvlyse />;
    default:
      return null;
  }
};

export default DittSvarPaInnkallelse;
