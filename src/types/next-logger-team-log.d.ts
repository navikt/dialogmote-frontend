declare module "@navikt/next-logger/team-log" {
  import type { Logger, LoggerOptions } from "pino";

  export const teamLogger: Logger;
  export const teamBackendLogger: (
    defaultConfig?: LoggerOptions,
  ) => Logger;
}
