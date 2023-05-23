import { grant } from "./tokenx.grant";
import { logger } from "@navikt/next-logger";
import { HttpError } from "@/common/utils/errors/HttpError";

export async function getTokenX(
  subjectToken: string,
  audience: string
): Promise<string> {
  let tokenX;

  try {
    tokenX = await grant(subjectToken, audience);
  } catch (e) {
    logger.error(
      `Failed grant for client id: ${audience}. Error message: ${e}`
    );
    throw new HttpError(401, "Login required");
  }

  if (!tokenX.access_token) {
    logger.error(`Token X missing access token for client id: ${audience}`);
    throw new HttpError(401, "Login required");
  }

  return tokenX.access_token;
}
