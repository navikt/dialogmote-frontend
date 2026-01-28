import { validateIdportenToken } from "@navikt/oasis";
import { logger } from "@navikt/next-logger";
import serverEnv from "@/server/utils/serverEnv";

export async function validateToken(token: string): Promise<boolean> {
  const validation = await validateIdportenToken(token);

  if (!validation.ok) {
    logger.error(`Token validation failed: ${validation.error}`);
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
