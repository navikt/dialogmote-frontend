import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import loginServiceToken from "@/server/auth/loginservice/loginServiceToken";
import { withSentry } from "@sentry/nextjs";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { combineDialogmoteDataAG } from "@/server/data/arbeidsgiver/combineDialogmoteDataAG";
import { fetchSykmeldtAG } from "@/server/data/arbeidsgiver/fetchSykmeldtAG";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";
import { DialogmoteData } from "types/shared/dialogmote";

const handler = nc<NextApiRequest, NextApiResponse<DialogmoteData>>(ncOptions)
  .use(loginServiceToken())
  .use(fetchSykmeldtAG)
  .use(fetchConcurrentDataAG)
  .use(combineDialogmoteDataAG)
  .get(async (req, res: NextApiResponseAG) => {
    res.json(res.dialogmoteData);
  });

export default withSentry(handler);
