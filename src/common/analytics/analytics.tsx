import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";
import { Events } from "@/common/analytics/events";
import { Audience } from "@/common/hooks/routeHooks";
import { logger } from "@navikt/next-logger";
import { isDemoOrLocal } from "@/common/publicEnv";

const combineEventData = (
  audience: Audience,
  eventData?: Record<string, string>
) => ({
  team: "eSyfo",
  app: "dialogmote-frontend",
  audience,
  ...eventData,
});

// Prefer using the useAnalytics hook to using this directly
export const sendTrackingEvent = async (
  audience: Audience,
  eventName: Events,
  eventData?: Record<string, string>
): Promise<void> => {
  if (isDemoOrLocal) {
    console.log(
      `Analytics event: ${eventName}, eventProperties:\n${JSON.stringify(
        combineEventData(audience, eventData),
        null,
        2
      )}`
    );
    return;
  }

  try {
    const log = getAnalyticsInstance("dialogmote");
    await log(eventName, combineEventData(audience, eventData));
  } catch (error) {
    logger.error(
      `Could not log event to Analytics. Message: ${(error as Error)?.message}`
    );
  }
};
