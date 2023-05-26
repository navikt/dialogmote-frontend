import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postBrevLestAG } from "@/server/data/arbeidsgiver/isDialogmoteApiAG";

const handler = nc<NextApiRequest, NextApiResponse<void>>(ncOptions)
  .use(postBrevLestAG)
  .post(async (req, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
