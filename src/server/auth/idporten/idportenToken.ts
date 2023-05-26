import { NextApiRequest } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { validateToken } from "./verifyIdportenToken";
import { HttpError } from "@/common/utils/errors/HttpError";

export async function getIdportenToken(req: NextApiRequest) {
  if (isMockBackend) {
    return "sometoken";
  }

  const bearerToken = req.headers["authorization"];

  if (!bearerToken || !(await validateToken(bearerToken))) {
    throw new HttpError(401, "Login required");
  }

  return bearerToken.replace("Bearer ", "");
}
