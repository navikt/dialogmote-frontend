import { sendTrackingToAmplitude } from "@/common/amplitude/amplitude";
import { useAudience } from "@/common/hooks/routeHooks";
import { Events } from "@/common/amplitude/events";

export const useAmplitude = () => {
  const { audience } = useAudience();

  const trackEvent = (eventName: Events, eventData?: Record<string, string>) =>
    sendTrackingToAmplitude(audience, eventName, eventData);

  return { trackEvent };
};
