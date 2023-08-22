import React, { ReactElement } from "react";
import { Alert, BodyLong } from "@navikt/ds-react";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import { SvarType } from "types/shared/brev";

const texts = {
  svartKommer: "Du har svart at du kommer til dette dialogmøtet.",
  taKontakt: "Ta kontakt hvis tidspunktet likevel ikke passer.",
  svartVilEndre:
    "Du har svart at du ønsker å endre tidspunkt eller sted for dette dialogmøtet.\n\nNAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.",
  svartKommerIkke:
    "Du har svart at du ønsker å avlyse dette dialogmøtet.\n\nNAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.\n\nSelv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig.",
};

const JegKommer = (): ReactElement => {
  return (
    <Alert className="mb-8" variant="success" aria-live="polite">
      <BodyLong>{texts.svartKommer}</BodyLong>
      <KontaktOssLink linkText={texts.taKontakt} />
    </Alert>
  );
};

const JegVilEndre = (): ReactElement => {
  return (
    <Alert className="mb-8" variant="warning" aria-live="polite">
      <BodyLong>{texts.svartVilEndre}</BodyLong>
    </Alert>
  );
};

const JegVilAvlyse = (): ReactElement => {
  return (
    <Alert className="mb-8" variant="warning" aria-live="polite">
      <BodyLong>{texts.svartKommerIkke}</BodyLong>
    </Alert>
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
