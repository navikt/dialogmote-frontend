import { NextApiResponse } from "next";
import cookie from "cookie";
import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import serverLogger from "@/server/utils/serverLogger";
import { isMockBackend } from "@/common/publicEnv";

const loginServiceToken =
  () =>
  async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: (e?: Error) => void
  ) => {
    if (isMockBackend) {
      return next();
    }

    const cookies = cookie.parse(req?.headers.cookie || "");
    const selvbetjeningIdtoken = cookies["selvbetjening-idtoken"];
    if (!selvbetjeningIdtoken) {
      res.status(401).json({ message: "Access denied" });
    }

    serverLogger.info({}, "selvbetjening-idtoken validated ok");

    req.loginServiceToken = selvbetjeningIdtoken;

    next();
  };

export default loginServiceToken;
