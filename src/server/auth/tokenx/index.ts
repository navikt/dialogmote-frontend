import serverLogger from "@/server/utils/serverLogger";
import { ApiErrorException, generalError } from "@/common/api/axios/errors";
import { grant } from "./tokenx.grant";

export async function getTokenX(
  subjectToken: string,
  audience: string
): Promise<string> {
  serverLogger.info(`subject token: ", ${subjectToken.replace("Bearer ", "")}`);

  let tokenX;

  try {
    tokenX = await grant(subjectToken, audience);
  } catch (e) {
    serverLogger.error(`Failed grant. ${e}`);
    throw new ApiErrorException(generalError(new Error("Failed grant")));
  }

  if (!tokenX.access_token) {
    serverLogger.error("TokenX missing access token");
    throw new ApiErrorException(generalError(new Error("Failed grant")));
  }

  return tokenX.access_token;
}
