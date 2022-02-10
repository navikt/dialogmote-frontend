import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { fetchIsSykmeldtAG } from "@/server/data/arbeidsgiver/fetchIsSykmeldtAG";
import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";

interface ExtendedRespons extends NextApiResponse {
  sykmeldt: Sykmeldt;
}

const handler = nc<NextApiRequest, NextApiResponse<Sykmeldt>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchIsSykmeldtAG)
  .get((_req, res: ExtendedRespons) => {
    res.status(200).json(res.sykmeldt);
  });

export default withSentry(handler);
