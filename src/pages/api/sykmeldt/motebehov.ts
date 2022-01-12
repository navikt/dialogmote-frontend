import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import tokenX from "@/server/auth/tokenX";
import { Brev } from "@/common/api/types/brevTypes";
import serverEnv from "@/server/utils/serverEnv";
import { ncOptions } from "@/server/utils/ncOptions";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { fetchMotebehov } from "@/server/data/fetchMotebehov";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(tokenX(serverEnv.ISDIALOGMOTE_AUDIENCE))
  .use(fetchMotebehov)
  .get(
    async (
      req,
      res: NextApiResponse & { motebehovStatus: MotebehovStatus }
    ) => {
      res.status(200).json(res.motebehovStatus);
    }
  );

export default handler;
