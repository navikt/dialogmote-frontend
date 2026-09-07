import { logger } from "@navikt/next-logger";
import { validateIdportenToken } from "@navikt/oasis";
import { HttpError } from "@/common/utils/errors/HttpError";
import serverEnv from "@/server/utils/serverEnv";

export async function validateToken(token: string): Promise<boolean> {
  let validation: Awaited<ReturnType<typeof validateIdportenToken>>;
  try {
    validation = await validateIdportenToken(token);
  } catch {
    logTokenValidationFailure("IDPORTEN_TOKEN_VALIDATION_ERROR");
    throw new HttpError(500, "ID-porten token validation failed");
  }

  if (!validation.ok) {
    if (validation.errorType === "token expired") {
      logger.warn(
        {
          event_type: "idporten_token_expired",
          operation: "validate_idporten_token",
          error_code: "IDPORTEN_TOKEN_EXPIRED",
        },
        "ID-porten token expired",
      );
      return false;
    }
    if (isInvalidTokenError(validation.error)) {
      logTokenValidationFailure("IDPORTEN_TOKEN_VALIDATION_FAILED");
      return false;
    }
    logTokenValidationFailure("IDPORTEN_TOKEN_VALIDATION_ERROR");
    throw new HttpError(500, "ID-porten token validation failed");
  }

  if (validation.payload.client_id !== serverEnv.IDPORTEN_CLIENT_ID) {
    logger.error("client_id does not match app client_id");
    return false;
  }

  if (
    validation.payload.acr !== "Level4" &&
    validation.payload.acr !== "idporten-loa-high"
  ) {
    logger.warn("token does not have acr Level4 or idporten-loa-high");
    return false;
  }

  return true;
}

// Oasis also returns network and JWKS failures as negative validation results.
// Only known token errors should ask the user to log in again.
function isInvalidTokenError(error: Error): boolean {
  if (!("code" in error)) return false;
  switch (error.code) {
    case "ERR_JWT_EXPIRED":
    case "ERR_JWT_CLAIM_VALIDATION_FAILED":
    case "ERR_JWT_INVALID":
    case "ERR_JWS_INVALID":
    case "ERR_JWS_SIGNATURE_VERIFICATION_FAILED":
    case "ERR_JOSE_ALG_NOT_ALLOWED":
      return true;
    default:
      return false;
  }
}

type TokenValidationErrorCode =
  | "IDPORTEN_TOKEN_VALIDATION_FAILED"
  | "IDPORTEN_TOKEN_VALIDATION_ERROR";

function logTokenValidationFailure(errorCode: TokenValidationErrorCode): void {
  logger.error(
    {
      event_type: "idporten_token_validation_failed",
      operation: "validate_idporten_token",
      error_code: errorCode,
    },
    "ID-porten token validation failed",
  );
}
