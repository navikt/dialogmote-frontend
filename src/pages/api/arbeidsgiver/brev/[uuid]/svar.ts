import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { postBrevSvarAG } from "@/server/data/arbeidsgiverBrevData";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevSvarAG)
  .get(async (req, res: NextApiResponse) => {
    res.status(200);
  });

export default handler;
