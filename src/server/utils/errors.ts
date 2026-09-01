import { logger } from "@navikt/next-logger";
import { HttpError } from "@/common/utils/errors/HttpError";

export const handleQueryParamError = (
  ..._params: (string | string[] | undefined)[]
): never => {
  logger.error(
    {
      event_type: "dialogmote_query_param_invalid",
      operation: "validate_query_params",
      error_code: "INVALID_QUERY_PARAM",
    },
    "Malformed query params",
  );
  throw new HttpError(500, "Malformed query params");
};
