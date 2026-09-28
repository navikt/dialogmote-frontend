import { createLogger } from "@navikt/esyfo-logger";
import { logger } from "@navikt/next-logger";

/** Preserve the configured logger's JSON encoder, metadata and active trace. */
export const appLog = createLogger(logger);
