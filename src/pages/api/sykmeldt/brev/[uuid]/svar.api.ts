import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postBrevSvarSM } from "@/server/data/sykmeldt/isDialogmoteApiSM";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(postBrevSvarSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
