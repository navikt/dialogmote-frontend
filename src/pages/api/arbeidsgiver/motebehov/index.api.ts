import { NextApiRequest, NextApiResponse } from "next";
import { MotebehovSvarRequestAG } from "../../../../types/shared/motebehov";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { getMotebehovTokenX } from "@/server/auth/tokenx";
import { post } from "@/common/api/axios/axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    return;
  } else {
    const token = await getMotebehovTokenX(req);

    // TODO: Add validation?

    const svar: MotebehovSvarRequestAG = req.body;
    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/motebehov`,
      "postMotebehovAGException",
      svar,
      {
        accessToken: token,
      }
    );
  }
  res.status(200).end();
};
export default handler;
