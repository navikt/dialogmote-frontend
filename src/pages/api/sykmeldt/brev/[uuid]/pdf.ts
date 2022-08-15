import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import { fetchBrevPdfSM } from "@/server/data/sykmeldt/isDialogmoteApiSM";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse<any>>(ncOptions)
  .use(getIdportenToken)
  .use(fetchBrevPdfSM)
  .get(async (req: NextApiRequest, res: NextApiResponse & { pdf: any }) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="brev.pdf"');
    res.end(res.pdf);
  });

export default withSentry(handler);
