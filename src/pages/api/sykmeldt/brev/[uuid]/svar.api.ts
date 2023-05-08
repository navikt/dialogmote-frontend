import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { postBrevSvarSM } from "@/server/data/sykmeldt/isDialogmoteApiSM";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(postBrevSvarSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
