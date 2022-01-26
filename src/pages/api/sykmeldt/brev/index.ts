import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Brev } from "@/common/api/types/brevTypes";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { fetchBrevSM } from "@/server/data/sykmeldtBrevData";
import { withSentry } from "@sentry/nextjs";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchBrevSM)
  .get(async (req, res: NextApiResponse & { brevArray: Brev[] }) => {
    res.status(200).json(res.brevArray);
  });

export default withSentry(handler);
