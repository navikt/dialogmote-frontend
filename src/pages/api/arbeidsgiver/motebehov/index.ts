import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import { postMotebehovAG } from "@/server/data/arbeidsgiver/syfomotebehovApiAG";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(postMotebehovAG)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
