import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { postBrevLestSM } from "@/server/data/sykmeldt/isDialogmoteApiSM";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevLestSM)
  .get(async (req, res: NextApiResponse) => {
    res.status(200);
  });

export default withSentry(handler);
