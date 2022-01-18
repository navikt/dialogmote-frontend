import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postBrevLest } from "@/server/data/sykmeldt/isDialogmote/postBrevLest";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevLest)
  .get(async (req, res: NextApiResponse) => {
    res.status(200);
  });

export default handler;
