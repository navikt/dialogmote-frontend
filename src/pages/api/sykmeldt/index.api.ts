import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { combineDialogmoteDataSM } from "@/server/data/sykmeldt/combineDialogmoteDataSM";
import { fetchConcurrentDataSM } from "@/server/data/sykmeldt/fetchConcurrentDataSM";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import { DialogmoteData } from "types/shared/dialogmote";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse<DialogmoteData>>(ncOptions)
  .use(getIdportenToken)
  .use(fetchConcurrentDataSM)
  .use(combineDialogmoteDataSM)
  .get(async (req, res: NextApiResponseSM) => {
    res.status(200).json(res.dialogmoteData);
  });

export default handler;
