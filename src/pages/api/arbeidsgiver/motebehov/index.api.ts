import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postMotebehovAG } from "@/server/data/arbeidsgiver/syfomotebehovApiAG";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(postMotebehovAG)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
