import { NextApiRequest, NextApiResponse } from "next";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { getMotebehovTokenX } from "@/server/auth/tokenx";
import { post } from "@/common/api/axios/axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const token = await getMotebehovTokenX(req);

    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov/ferdigstill`,
      "ferdigstillMotebehovSMException",
      {
        accessToken: token,
      }
    );
  }
  res.status(200).end();
};
export default handler;
