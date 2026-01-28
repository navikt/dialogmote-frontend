import { sendTrackingEvent } from "@/common/analytics/analytics";
import type { Events } from "@/common/analytics/events";
import { useAudience } from "@/common/hooks/routeHooks";

export const useAnalytics = () => {
  const { audience } = useAudience();

  const trackEvent = (eventName: Events, eventData?: Record<string, string>) =>
    sendTrackingEvent(audience, eventName, eventData);

  return { trackEvent };
};
