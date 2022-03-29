import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import serverLogger from "@/server/utils/serverLogger";
import { validateToken } from "@/server/auth/idporten/verifyIdportenToken";
import { grant } from "@/server/auth/tokenx/tokenx.grant";
import {
  ApiErrorException,
  generalError,
  tokenError,
} from "@/common/api/axios/errors";

export const tokenX =
  (audience: string) =>
  async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: (e?: Error) => void
  ) => {
    if (isMockBackend) {
      return next();
    }

    const bearerToken: string | undefined = req.headers["authorization"];

    if (!bearerToken || !(await validateToken(bearerToken))) {
      return next(new ApiErrorException(tokenError()));
    }

    serverLogger.info({}, "Authorization header validated ok");

    let tokenX;
    try {
      tokenX = await grant(
        bearerToken.substring(7, bearerToken.length),
        audience
      );
    } catch (e) {
      serverLogger.error(e, "Failed grant");
      return next(
        new ApiErrorException(generalError(new Error("Failed grant")))
      );
    }

    serverLogger.info({}, "Successfully received tokenx token");

    req.tokenSet = tokenX;

    next();
  };
