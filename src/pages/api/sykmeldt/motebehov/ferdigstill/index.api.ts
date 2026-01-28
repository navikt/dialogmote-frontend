import { NextApiRequest, NextApiResponse } from "next";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    await tokenXFetchPost({
      req,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      endpoint: `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov/ferdigstill`,
    });
  }
  res.status(200).end();
};
export default handler;
