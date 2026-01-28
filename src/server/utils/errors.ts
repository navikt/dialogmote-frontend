import { logger } from "@navikt/next-logger";
import type { ZodError } from "zod";
import type { Audience } from "@/common/hooks/routeHooks";
import { HttpError } from "@/common/utils/errors/HttpError";

export function handleSchemaParsingError(
  audience: Audience,
  schema: string,
  error: ZodError,
) {
  const formattedErrorText = `${audience} is unable to parse ${schema}-schema: ${error.toString()}`;
  logger.error(formattedErrorText);
  throw new HttpError(500, formattedErrorText);
}

export const handleQueryParamError = (
  ...params: (string | string[] | undefined)[]
): never => {
  const formattedErrorText = `Malformed query params: ${JSON.stringify(
    params,
  )}`;
  logger.error(formattedErrorText);
  throw new HttpError(500, formattedErrorText);
};
