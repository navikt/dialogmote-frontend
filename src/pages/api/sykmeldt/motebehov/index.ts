import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postMotebehovSM } from "@/server/data/sykmeldt/syfomotebehovApiSM";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(postMotebehovSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
