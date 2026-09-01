import { logger } from "@navikt/next-logger";
import { validateIdportenToken } from "@navikt/oasis";
import serverEnv from "@/server/utils/serverEnv";

export async function validateToken(token: string): Promise<boolean> {
  const validation = await validateIdportenToken(token);

  if (!validation.ok) {
    const operation = "validate_idporten_token";
    if (validation.errorType === "token expired") {
      logger.warn(
        {
          event_type: "idporten_token_expired",
          operation,
          error_code: "IDPORTEN_TOKEN_EXPIRED",
        },
        "ID-porten token expired",
      );
    } else {
      logger.error(
        {
          event_type: "idporten_token_validation_failed",
          operation,
          error_code: "IDPORTEN_TOKEN_VALIDATION_FAILED",
        },
        "ID-porten token validation failed",
      );
    }
    return false;
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
