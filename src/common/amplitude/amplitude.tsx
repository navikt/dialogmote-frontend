import amplitude from "amplitude-js";
import { Events } from "@/common/amplitude/events";
import { Audience } from "@/common/hooks/routeHooks";

const combineEventData = (
  audience: Audience,
  eventData?: Record<string, string>
) => {
  return {
    team: "eSyfo",
    app: "dialogmote-frontend",
    audience: audience,
    ...eventData,
  };
};

export const initAmplitude = () => {
  amplitude?.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

//Prefer using the useAmplitude hook to using this directly
export const sendTrackingToAmplitude = (
  audience: Audience,
  eventName: Events,
  eventData?: Record<string, string>
) => {
  amplitude
    ?.getInstance()
    .logEvent(eventName, combineEventData(audience, eventData));
};
