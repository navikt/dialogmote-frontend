import { useLandingUrl } from "@/common/hooks/routeHooks";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { Events } from "@/common/amplitude/events";
import React from "react";
import { Alert } from "@navikt/ds-react";
import { texts } from "@/common/components/error/texts";

interface Props {
  children: string;
}

export const ErrorWithEscapeRoute = ({ children }: Props) => {
  const landingUrl = useLandingUrl();
  return (
    <Alert variant="error">
      {children}
      <div>
        <RouterLenke
          href={landingUrl}
          trackingName={Events.ErrorWithEscapeRoute}
        >
          {texts.errorWithEscapeRoute.goToLandingPage}
        </RouterLenke>
      </div>
    </Alert>
  );
};
