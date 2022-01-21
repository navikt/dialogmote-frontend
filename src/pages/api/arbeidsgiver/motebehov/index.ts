import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Brev } from "@/common/api/types/brevTypes";
import { ncOptions } from "@/server/utils/ncOptions";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { fetchMotebehovAG } from "@/server/data/arbeidsgiverMotebehovData";
import {withSentry} from "@sentry/nextjs";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchMotebehovAG)
  .get(
    async (
      req,
      res: NextApiResponse & { motebehovStatus: MotebehovStatus }
    ) => {
      res.status(200).json(res.motebehovStatus);
    }
  );

export default withSentry(handler);
