import type { NextApiRequest, NextApiResponse } from "next";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    await tokenXFetchPost({
      req,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      endpoint: `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/arbeidstaker/motebehov/ferdigstill`,
    });
  }
  res.status(200).end();
};
export default handler;
