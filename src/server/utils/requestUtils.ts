import type { NextApiRequest } from "next";

export const NAV_PERSONIDENT_HEADER = "nav-personident";

export const getSykmeldtFnrFromHeader = (req: NextApiRequest) => {
  const sykmeldtFnr = req.headers[NAV_PERSONIDENT_HEADER];

  if (typeof sykmeldtFnr !== "string") {
    throw new Error(`Mangler eller ugyldig header: ${NAV_PERSONIDENT_HEADER}`);
  }

  return sykmeldtFnr;
};
