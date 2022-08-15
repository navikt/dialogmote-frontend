import { IncomingHttpHeaders } from "http";
import { IValidationResult, ValidationResult } from "./ValidationResult";

export const validateAuthorizationHeader = (
  headers: IncomingHttpHeaders
): IValidationResult<string> => {
  const errors: string[] = [];

  if (!headers["authorization"]) {
    errors.push("missing authorization header");
  }

  const auth = headers["authorization"];

  const bearerToken = auth?.startsWith("Bearer ")
    ? auth.substring(7, auth.length)
    : "";

  if (!bearerToken) {
    errors.push("could not locate valid bearer token in authorization header");
  }

  return new ValidationResult(bearerToken || "", errors);
};
