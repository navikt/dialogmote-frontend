import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { postBrevLestAG } from "@/server/data/arbeidsgiverBrevData";
import {withSentry} from "@sentry/nextjs";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevLestAG)
  .get(async (req, res: NextApiResponse) => {
    res.status(200);
  });

export default withSentry(handler);
