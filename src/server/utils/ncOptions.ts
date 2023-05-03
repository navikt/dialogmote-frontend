import { Options } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiErrorException } from "@/common/api/axios/errors";

export const ncOptions: Options<NextApiRequest, NextApiResponse> = {
  onError: (
    error: ApiErrorException,
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    if (error.code === 401 || error.code === 403) {
      res.status(401).json({ message: "Access denied" });
    } else {
      res.status(500).end();
    }
  },
};
