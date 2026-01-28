import { BodyLong, LocalAlert } from "@navikt/ds-react";
import type { ReactElement } from "react";
import type { SvarType } from "types/shared/brev";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";

const texts = {
  svartKommer: "Du har svart at du kommer til dette dialogmøtet.",
  taKontakt: "Ta kontakt hvis tidspunktet likevel ikke passer.",
  svartVilEndre:
    "Du har svart at du ønsker å endre tidspunkt eller sted for dette dialogmøtet.\n\nNav-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.",
  svartKommerIkke:
    "Du har svart at du ønsker å avlyse dette dialogmøtet.\n\nNav-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.\n\nSelv om du ønsker å avlyse, kan det hende Nav-kontoret likevel konkluderer med at et møte er nødvendig.",
};

const JegKommer = (): ReactElement => {
  return (
    <LocalAlert className="mb-4" status="success" aria-live="polite">
      <LocalAlert.Content>
        <BodyLong>{texts.svartKommer}</BodyLong>
        <KontaktOssLink linkText={texts.taKontakt} />
      </LocalAlert.Content>
    </LocalAlert>
  );
};

const JegVilEndre = (): ReactElement => {
  return (
    <LocalAlert className="mb-4" status="warning" aria-live="polite">
      <LocalAlert.Content>
        <BodyLong>{texts.svartVilEndre}</BodyLong>
      </LocalAlert.Content>
    </LocalAlert>
  );
};

const JegVilAvlyse = (): ReactElement => {
  return (
    <LocalAlert className="mb-4" status="warning" aria-live="polite">
      <LocalAlert.Content>
        <BodyLong>{texts.svartKommerIkke}</BodyLong>
      </LocalAlert.Content>
    </LocalAlert>
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
