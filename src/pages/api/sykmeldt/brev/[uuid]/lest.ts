import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { postBrevLestSM } from "@/server/data/sykmeldt/isDialogmoteApiSM";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevLestSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
