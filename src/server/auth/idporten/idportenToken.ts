import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import { validateToken } from "./verifyIdportenToken";
import { HttpError } from "@/common/utils/errors/HttpError";

async function getIdportenToken(
  req: IAuthenticatedRequest,
  _res: NextApiResponse,
  next: (e?: Error) => void
) {
  if (isMockBackend) {
    return next();
  }

  const bearerToken = req.headers["authorization"];

  if (!bearerToken || !(await validateToken(bearerToken))) {
    throw new HttpError(401, "Login required");
  }

  req.idportenToken = bearerToken.replace("Bearer ", "");
  next();
}

export default getIdportenToken;
