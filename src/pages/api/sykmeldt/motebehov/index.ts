import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Brev } from "@/common/api/types/brevTypes";
import { ncOptions } from "@/server/utils/ncOptions";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { fetchMotebehovSM } from "@/server/data/sykmeldtMotebehovData";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchMotebehovSM)
  .get(
    async (
      req,
      res: NextApiResponse & { motebehovStatus: MotebehovStatus }
    ) => {
      res.status(200).json(res.motebehovStatus);
    }
  );

export default handler;
