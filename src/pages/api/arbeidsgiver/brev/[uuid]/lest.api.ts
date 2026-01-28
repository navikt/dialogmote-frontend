import type { NextApiRequest, NextApiResponse } from "next";
import { isDemoOrLocal, isLocal } from "@/common/publicEnv";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import getMockDb from "@/server/data/mock/getMockDb";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import serverEnv from "@/server/utils/serverEnv";
import { isValidUuid } from "@/server/utils/validateUuid";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { uuid } = req.query;
  if (!isValidUuid(uuid)) {
    res.status(400).end("Invalid uuid");
    return;
  }

  if (isLocal) {
    const brevToUpdate = getMockDb(req).brev.find((b) => b.uuid === uuid);
    if (brevToUpdate) {
      brevToUpdate.lestDato = new Date().toISOString();
    }
  }
  if (isDemoOrLocal) {
    return;
  } else {
    await tokenXFetchPost({
      req,
      targetApi: TokenXTargetApi.ISDIALOGMOTE,
      endpoint: `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/narmesteleder/brev/${uuid}/les`,
    });
  }
  res.status(200).end();
};
export default handler;
