import { useLandingUrl } from "@/common/hooks/routeHooks";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { Events } from "@/common/analytics/events";
import { LocalAlert } from "@navikt/ds-react";

interface Props {
  children: string;
}

export const ErrorWithEscapeRoute = ({ children }: Props) => {
  const landingUrl = useLandingUrl();
  return (
    <LocalAlert status="error">
      <LocalAlert.Content>
        {children}
        <div>
          <RouterLenke
            href={landingUrl}
            trackingName={Events.ErrorWithEscapeRoute}
          >
            Gå til landingssiden
          </RouterLenke>
        </div>
      </LocalAlert.Content>
    </LocalAlert>
  );
};
