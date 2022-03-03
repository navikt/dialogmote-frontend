import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { combineDialogmoteDataAG } from "@/server/data/arbeidsgiver/combineDialogmoteDataAG";
import { fetchIsSykmeldtAG } from "@/server/data/arbeidsgiver/fetchIsSykmeldtAG";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";

const handler = nc<NextApiRequest, NextApiResponse<Brev[]>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchIsSykmeldtAG)
  .use(fetchConcurrentDataAG)
  .use(combineDialogmoteDataAG)
  .get(async (req, res: NextApiResponseAG) => {
    res.json(res.dialogmoteData);
  });

export default withSentry(handler);
