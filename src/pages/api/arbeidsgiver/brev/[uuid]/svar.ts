import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import { postBrevSvarAG } from "@/server/data/arbeidsgiver/isDialogmoteApiAG";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(getIdportenToken)
  .use(postBrevSvarAG)
  .post(async (req, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
