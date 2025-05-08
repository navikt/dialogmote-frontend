import { Alert, BodyLong, Link } from "@navikt/ds-react";
import { oppfolgingsplanUrlAG, oppfolgingsplanUrlSM } from "@/common/publicEnv";
import { Events } from "@/common/amplitude/events";
import React from "react";
import { useAudience } from "@/common/hooks/routeHooks";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";

const texts = {
  alertstripe: "Husk å dele oppfølgingsplanen med Nav før møtet.",
  oppfolgingsplanlink: "Gå til oppfølgingsplanen.",
};

export const DelOppfolgingsplanInfoBoks = () => {
  const { trackEvent } = useAmplitude();
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
