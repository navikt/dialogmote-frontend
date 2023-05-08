import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { fetchBrevPdfAG } from "@/server/data/arbeidsgiver/isDialogmoteApiAG";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(fetchBrevPdfAG)
  .get(async (req: NextApiRequest, res: NextApiResponse & { pdf: unknown }) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="brev.pdf"');
    res.end(res.pdf);
  });

export default handler;