import { LocalAlert } from "@navikt/ds-react";
import { Events } from "@/common/analytics/events";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { useLandingUrl } from "@/common/hooks/routeHooks";

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
