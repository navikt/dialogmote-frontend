import { IncomingMessage } from "node:http";
import { getToken } from "@navikt/oasis";
import { validateToken } from "./verifyIdportenToken";
import { HttpError } from "@/common/utils/errors/HttpError";
import { isMockBackend } from "@/server/utils/serverEnv";
import { logger } from "@navikt/next-logger";

export type TokenValidationResult =
  | { success: true; token: string }
  | { success: false; reason: string };

export async function validateIdportenToken(
  req: IncomingMessage
): Promise<TokenValidationResult> {
  if (isMockBackend) {
    return { success: true, token: "sometoken" };
  }

  const token = getToken(req);

  if (!token) {
    const reason = "Missing idporten token";
    logger.warn(reason);
    return { success: false, reason };
  }

  if (!(await validateToken(token))) {
    const reason = "Invalid idporten token";
    logger.warn(reason);
    return { success: false, reason };
  }

  return { success: true, token };
}

export async function validateAndGetIdportenToken(
  req: IncomingMessage
): Promise<string> {
  const validation = await validateIdportenToken(req);

  if (!validation.success) {
    throw new HttpError(401, "Login required");
  }

  return validation.token;
}
