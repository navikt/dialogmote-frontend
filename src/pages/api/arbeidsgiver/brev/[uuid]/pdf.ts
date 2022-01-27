import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { fetchBrevPdfAG } from "@/server/data/arbeidsgiverBrevData";
import { withSentry } from "@sentry/nextjs";

const handler = nc<NextApiRequest, NextApiResponse<any>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchBrevPdfAG)
  .get(async (req, res: NextApiResponse & { pdf: any }) => {
    res.status(200).json(res.pdf);
  });

export default withSentry(handler);
