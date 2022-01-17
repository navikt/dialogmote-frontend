import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postBrevSvar } from "@/server/data/sykmeldt/isDialogmote/postBrevSvar";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(loginServiceToken())
  .use(postBrevSvar)
  .get(async (req, res: NextApiResponse) => {
    res.status(200);
  });

export default handler;
