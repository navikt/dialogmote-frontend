import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { postMotebehovAG } from "@/server/data/arbeidsgiver/syfomotebehovApiAG";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(loginServiceToken())
  .use(postMotebehovAG)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
