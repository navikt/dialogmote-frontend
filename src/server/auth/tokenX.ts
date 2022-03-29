import { NextApiResponse } from "next";
import {
  validateAccessToken,
  validateAuthorizationHeader,
} from "./validations";
import serverLogger from "../utils/serverLogger";
import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { grant } from "./tokenx/tokenx.grant";
import { isMockBackend } from "@/common/publicEnv";

const tokenX =
  (audience: string) =>
  async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: (e?: Error) => void
  ) => {
    if (isMockBackend) {
      return next();
    }

    serverLogger.info(req.headers, "Enter tokenX");

    const authorizationHeaderValidation = validateAuthorizationHeader(
      req.headers
    );

    if (!authorizationHeaderValidation.success) {
      serverLogger.info(
        authorizationHeaderValidation.error,
        "authorization header validation error"
      );
      return next(new Error(authorizationHeaderValidation.error));
    }

    serverLogger.info({}, "authorization header validated ok");

    const accessToken = authorizationHeaderValidation.value;

    const accessTokenValidation = await validateAccessToken(accessToken);
    if (!accessTokenValidation.success) {
      return next(new Error(accessTokenValidation.error));
    }

    serverLogger.info({}, "access token validated ok");

    let tokenX;
    try {
      tokenX = await grant(accessToken, audience);
    } catch (e) {
      serverLogger.error(e, "failed to get tokenx token from access token");
      return next(new Error("failed to get tokenx token from access token"));
    }

    serverLogger.info({}, "successfully received tokenx token");

    console.log("tokenX: ", tokenX);
    req.tokenSet = tokenX;

    next();
  };

export default tokenX;
