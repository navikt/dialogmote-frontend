import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import tokenX from "@/server/auth/tokenX";
import { Brev } from "@/common/api/types/brevTypes";
import { fetchBrev } from "@/server/data/fetchBrev";
import serverEnv from "@/server/utils/serverEnv";
import { ncOptions } from "@/server/utils/ncOptions";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(tokenX(serverEnv.ISDIALOGMOTE_AUDIENCE))
  .use(fetchBrev)
  .get(async (req, res: NextApiResponse & { brevArray: Brev[] }) => {
    res.status(200).json(res.brevArray);
  });

export default handler;
