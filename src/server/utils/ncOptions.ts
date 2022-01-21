import { Options } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import serverLogger from "@/server/utils/serverLogger";

export const ncOptions: Options<NextApiRequest, NextApiResponse> = {
  onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
    serverLogger.error(
      { url: req.url, method: req.method, error: err.message },
      "api request failed"
    );
    throw err
  },
};
