import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postMotebehovSM } from "@/server/data/sykmeldt/syfomotebehovApiSM";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(postMotebehovSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
