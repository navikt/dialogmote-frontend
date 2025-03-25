import { logger } from "@navikt/next-logger";

// eslint-disable-next-line
declare const window: any;

const UUID =
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const ORGNR = /\b[0-9a-f]{9}\b/g;
const FNR = /\b[0-9]{11}\b/g;

export function cleanPathForMetric(
  value: string | undefined
): string | undefined {
  return value
    ?.replace(UUID, "[uuid]")
    .replace(ORGNR, "[orgnr]")
    .replace(FNR, "[fnr]");
}

export type ErrorType =
  | "fetchActiveTestScenarioException"
  | "setActiveTestScenarioException"
  | "fetchDialogmoteDataAGException"
  | "fetchDialogmoteDataSMException"
  | "fetchBrevPdfAGException"
  | "postBrevLestAGException"
  | "postBrevSvarAGException"
  | "fetchBrevPdfSMException"
  | "postBrevLestSMException"
  | "postBrevSvarSMException"
  | "getBrevAGException"
  | "getBrevSMException"
  | "getMotebehovAGException"
  | "getMotebehovSMException"
  | "getSykmeldtException"
  | "postLestBrevException"
  | "svarPaaInnkallingException"
  | "svarPaaMotebehovAGException"
  | "svarPaaMotebehovSMException"
  | "postMotebehovAGException"
  | "postMotebehovSMException"
  | "ferdigstillMotebehovSMException"
  | "ErrorBoundaryException";

export const logError = (error: Error, errorType: ErrorType) => {
  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(error, {
      type: errorType,
    });
  } else {
    logger.error(error.message);
  }
};
