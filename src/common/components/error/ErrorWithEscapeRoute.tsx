import { useLandingUrl, useRouteBasePath } from "@/common/hooks/routeHooks";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { Events } from "@/common/amplitude/events";
import React from "react";
import { Alert } from "@navikt/ds-react";

interface Props {
  children: string;
}

export const ErrorWithEscapeRoute = ({ children }: Props) => {
  const landingUrl = useLandingUrl();
  return (
    <Alert variant="error">
      {children}
      <RouterLenke href={landingUrl} trackingName={Events.ErrorWithEscapeRoute}>
        Gå til landingssiden
      </RouterLenke>
    </Alert>
  );
};
