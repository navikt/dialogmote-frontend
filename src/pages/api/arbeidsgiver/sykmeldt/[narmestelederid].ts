import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Brev } from "@/common/api/types/brevTypes";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { fetchSykmeldtAG } from "@/server/data/arbeidsgiverSykmeldtData";
import { Sykmeldt } from "@/common/api/types/sykmeldteTypes";
import {withSentry} from "@sentry/nextjs";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchSykmeldtAG)
  .get(async (req, res: NextApiResponse & { sykmeldt: Sykmeldt }) => {
    res.status(200).json(res.sykmeldt);
  });

export default withSentry(handler);
