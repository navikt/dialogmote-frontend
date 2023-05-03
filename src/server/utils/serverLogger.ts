import pino, { LoggerOptions } from "pino";
import { AxiosError } from "axios";

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

const loggerOptions: LoggerOptions = {
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty" }
      : undefined,
  level: "info",
  timestamp: false,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
};

export const logServerError = (
  error: AxiosError,
  url: string,
  httpMethod: string
) => {
  const logPrefix = typeof window === "undefined" ? "Backend:" : "Frontend:";

  if (error.code) {
    serverLogger.error(
      `${logPrefix} ${httpMethod} ${cleanPathForMetric(url)} returned code: ${
        error.code
      }, message: ${error.message}`
    );
  } else {
    serverLogger.error(
      `${logPrefix} ${httpMethod} ${cleanPathForMetric(
        url
      )} returned error message: ${error.message}`
    );
  }
};

const serverLogger = pino(loggerOptions);

export default serverLogger;
