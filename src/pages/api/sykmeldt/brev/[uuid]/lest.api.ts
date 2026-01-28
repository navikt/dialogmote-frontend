import { NextApiRequest, NextApiResponse } from "next";
import { isDemoOrLocal, isLocal } from "@/common/publicEnv";
import getMockDb from "@/server/data/mock/getMockDb";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import serverEnv from "@/server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isLocal) {
    const { uuid } = req.query;
    const brevToUpdate = getMockDb(req).brev.find((b) => b.uuid === uuid);
    if (brevToUpdate) {
      brevToUpdate.lestDato = new Date().toISOString();
    }
  }

  if (isDemoOrLocal) {
    return;
  } else {
    const { uuid } = req.query;
    await tokenXFetchPost({
      req,
      targetApi: TokenXTargetApi.ISDIALOGMOTE,
      endpoint: `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/arbeidstaker/brev/${uuid}/les`,
    });
  }
  res.status(200).end();
};
export default handler;
