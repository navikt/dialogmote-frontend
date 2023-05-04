import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { combineDialogmoteDataAG } from "@/server/data/arbeidsgiver/combineDialogmoteDataAG";
import { fetchSykmeldtAG } from "@/server/data/arbeidsgiver/fetchSykmeldtAG";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";
import { DialogmoteData } from "types/shared/dialogmote";
import getIdportenToken from "@/server/auth/idporten/idportenToken";

const handler = nc<NextApiRequest, NextApiResponse<DialogmoteData>>(ncOptions)
  .use(getIdportenToken)
  .use(fetchSykmeldtAG)
  .use(fetchConcurrentDataAG)
  .use(combineDialogmoteDataAG)
  .get(async (req, res: NextApiResponseAG) => {
    res.json(res.dialogmoteData);
  });

export default handler;
