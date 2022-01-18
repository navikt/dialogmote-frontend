import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { postBrevLestSM } from "@/server/data/sykmeldtBrevData";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevLestSM)
  .get(async (req, res: NextApiResponse) => {
    res.status(200);
  });

export default handler;
