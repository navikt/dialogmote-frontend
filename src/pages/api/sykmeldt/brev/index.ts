import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Brev } from "@/common/api/types/brevTypes";
import { fetchBrev } from "@/server/data/sykmeldt/isDialogmote/fetchBrev";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchBrev)
  .get(async (req, res: NextApiResponse & { brevArray: Brev[] }) => {
    res.status(200).json(res.brevArray);
  });

export default handler;
