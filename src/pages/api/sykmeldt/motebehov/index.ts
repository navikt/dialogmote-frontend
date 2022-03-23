import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import { postMotebehovSM } from "@/server/data/sykmeldt/syfomotebehovApiSM";
import tokenX from "@/server/auth/tokenX";
import serverEnv from "@/server/utils/serverEnv";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(tokenX(serverEnv.SYFOMOTEBEHOV_TOKENX_CLIENT_ID))
  .use(postMotebehovSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
