import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { fetchBrevPdfSM } from "@/server/data/sykmeldt/isDialogmoteApiSM";

const handler = nc<NextApiRequest, NextApiResponse<any>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchBrevPdfSM)
  .get(async (req, res: NextApiResponse & { pdf: any }) => {
    res.setHeader("content-type", "application/pdf");
    res.end(res.pdf);
  });

export default withSentry(handler);
