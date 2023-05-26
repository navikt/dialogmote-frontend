import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postBrevLestSM } from "@/server/data/sykmeldt/isDialogmoteApiSM";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(postBrevLestSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
