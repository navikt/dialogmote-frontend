import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { postBrevSvarAG } from "@/server/data/arbeidsgiver/isDialogmoteApiAG";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevSvarAG)
  .post(async (req, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
