declare module "@navikt/next-logger/pages" {
  import type { NextApiRequest, NextApiResponse } from "next";

  export const loggingRoute: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => void;
}
