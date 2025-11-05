import { Alert, BodyLong, Link } from "@navikt/ds-react";
import { oppfolgingsplanUrlAG, oppfolgingsplanUrlSM } from "@/common/publicEnv";
import { Events } from "@/common/analytics/events";
import React from "react";
import { useAudience } from "@/common/hooks/routeHooks";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";

const texts = {
  alertstripe: "Husk å dele oppfølgingsplanen med Nav før møtet.",
  oppfolgingsplanlink: "Gå til oppfølgingsplanen.",
};

export const DelOppfolgingsplanInfoBoks = () => {
  const { trackEvent } = useAnalytics();
  const { isAudienceSykmeldt } = useAudience();
  const narmestelederid = useNarmesteLederId();

  return (
    <Alert variant="info">
      <BodyLong>{texts.alertstripe}</BodyLong>
      <Link
        href={
          isAudienceSykmeldt
            ? oppfolgingsplanUrlSM
            : `${oppfolgingsplanUrlAG}/${narmestelederid}`
        }
        onClick={() => trackEvent(Events.Oppfolgingsplan)}
      >
        {texts.oppfolgingsplanlink}
      </Link>
    </Alert>
  );
};
