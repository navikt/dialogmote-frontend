import type { NextApiRequest } from "next";
import { NAV_PERSONIDENT_HEADER } from "@/common/api/fetch";

export const getSykmeldtFnrFromHeader = (req: NextApiRequest) => {
  const sykmeldtFnr = req.headers[NAV_PERSONIDENT_HEADER];

  if (typeof sykmeldtFnr !== "string") {
    throw new Error(`Mangler eller ugyldig header: ${NAV_PERSONIDENT_HEADER}`);
  }

  return sykmeldtFnr;
};
