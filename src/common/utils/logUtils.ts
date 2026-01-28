import { logger } from "@navikt/next-logger";

type FaroApi = {
  pushError: (error: Error, context?: { context: string }) => void;
};

type FaroWindow = Window & {
  faro?: {
    api: FaroApi;
  };
};

declare const window: FaroWindow;

const UUID =
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const ORGNR = /\b[0-9a-f]{9}\b/g;
const FNR = /\b[0-9]{11}\b/g;

export function cleanPathForMetric(
  value: string | undefined,
): string | undefined {
  return value
    ?.replace(UUID, "[uuid]")
    .replace(ORGNR, "[orgnr]")
    .replace(FNR, "[fnr]");
}

export const logError = (error: Error, context?: string) => {
  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(error, context ? { context } : undefined);
  } else {
    const prefix = context ? `${context}: ` : "";
    logger.error(`${prefix}${error.message}`);
  }
};
