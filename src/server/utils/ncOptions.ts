import { Options } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import serverLogger from "@/server/utils/serverLogger";
import { ApiErrorException } from "@/common/api/axios/errors";

const UUID =
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const ORGNR = /\b[0-9a-f]{9}\b/g;
const FNR = /\b[0-9]{11}\b/g;
export function cleanPathForMetric(
  value: string | undefined
): string | undefined {
  return value
    ?.replace(UUID, "[uuid]")
    .replace(ORGNR, "[orgnr]")
    .replace(FNR, "[fnr]");
}

export const ncOptions: Options<NextApiRequest, NextApiResponse> = {
  onError: (
    error: ApiErrorException,
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    if (error.code === 401 || error.code === 403) {
      res.status(401).json({ message: "Access denied" });
    } else {
      if (error.code) {
        serverLogger.error(
          `${req.method} ${cleanPathForMetric(req.url)} returned code: ${
            error.code
          }, message: ${error.message}`
        );
      } else {
        serverLogger.error(
          `${req.method} ${cleanPathForMetric(
            req.url
          )} returned error message: ${error.message}`
        );
      }

      res.status(500).end();
    }
  },
};
