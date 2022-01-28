import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { combineDialogmoteDataSM } from "@/server/data/sykmeldt/combineDialogmoteDataSM";
import { fetchConcurrentDataSM } from "@/server/data/sykmeldt/fetchConcurrentDataSM";
import { Brev } from "@/server/data/types/external/BrevTypes";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchConcurrentDataSM)
  .use(combineDialogmoteDataSM)
  .get(async (req, res: NextApiResponseAG) => {
    res.status(200).json(res.dialogmoteData);
  });

export default withSentry(handler);
