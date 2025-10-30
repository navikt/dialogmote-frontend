import { useAudience } from "@/common/hooks/routeHooks";
import { Events } from "@/common/analytics/events";
import { sendTrackingEvent } from "@/common/analytics/analytics";

export const useAnalytics = () => {
  const { audience } = useAudience();

  const trackEvent = (eventName: Events, eventData?: Record<string, string>) =>
    sendTrackingEvent(audience, eventName, eventData);

  return { trackEvent };
};
