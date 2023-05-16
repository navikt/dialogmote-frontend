import { Options } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

export const ncOptions: Options<NextApiRequest, NextApiResponse> = {
  onError: (error: AxiosError, req: NextApiRequest, res: NextApiResponse) => {
    if (error.response && error.response.status) {
      res.status(error.response.status).end();
    } else if (error.code) {
      res.status(parseInt(error.code)).end();
    } else {
      res.status(500).end();
    }
  },
};
