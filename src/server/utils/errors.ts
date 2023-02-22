import {
  ApiErrorException,
  generalError,
  schemaParsingError,
} from "@/common/api/axios/errors";
import { Audience } from "@/common/hooks/routeHooks";
import { ZodError } from "zod";

export function handleSchemaParsingError(
  audience: Audience,
  schema: string,
  error: ZodError
) {
  throw new ApiErrorException(
    schemaParsingError(
      new Error(
        `${audience} is unable to parse ${schema}-schema: ${error.toString()}`
      )
    )
  );
}

export const handleQueryParamError = (
  ...params: (string | string[] | undefined)[]
): never => {
  throw new ApiErrorException(
    generalError(new Error(`Malformed query params: ${JSON.stringify(params)}`))
  );
};
