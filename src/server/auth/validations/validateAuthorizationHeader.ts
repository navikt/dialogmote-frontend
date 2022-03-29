import { IncomingHttpHeaders } from "http";
import { IValidationResult, ValidationResult } from "./ValidationResult";
import serverLogger from "@/server/utils/serverLogger";

export const validateAuthorizationHeader = (
  headers: IncomingHttpHeaders
): IValidationResult<string> => {
  const errors: string[] = [];

  if (!headers["authorization"]) {
    serverLogger.info({}, "No auth header..");

    errors.push("missing authorization header");
  }

  const auth = headers["authorization"];

  serverLogger.info(auth, "Logging auth header..");

  const bearerToken = auth?.startsWith("Bearer ")
    ? auth.substring(7, auth.length)
    : "";

  if (!bearerToken) {
    errors.push("could not locate valid bearer token in authorization header");
  }

  return new ValidationResult(bearerToken || "", errors);
};
