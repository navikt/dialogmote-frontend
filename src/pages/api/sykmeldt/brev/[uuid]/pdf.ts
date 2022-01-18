import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { fetchBrevPdf } from "@/server/data/sykmeldt/isDialogmote/fetchBrevPdf";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";

const handler = nc<NextApiRequest, NextApiResponse<any>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchBrevPdf)
  .get(async (req, res: NextApiResponse & { pdf: any }) => {
    res.status(200).json(res.pdf);
  });

export default handler;
