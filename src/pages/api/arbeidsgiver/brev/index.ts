import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Brev } from "@/common/api/types/brevTypes";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { fetchBrevAG } from "@/server/data/arbeidsgiverBrevData";
import { withSentry } from "@sentry/nextjs";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchBrevAG)
  .get(async (req, res: NextApiResponse & { brevArray: Brev[] }) => {
    res.status(200).json(res.brevArray);
  });

export default withSentry(handler);
