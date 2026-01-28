import { NextApiRequest, NextApiResponse } from "next";
import { isDemoOrLocal, isLocal } from "@/common/publicEnv";
import getMockDb from "@/server/data/mock/getMockDb";
import { SvarRespons } from "../../../../../types/shared/brev";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import serverEnv from "@/server/utils/serverEnv";
import { isValidUuid } from "@/server/utils/validateUuid";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { uuid } = req.query;
  if (!isValidUuid(uuid)) {
    res.status(400).end("Invalid uuid");
    return;
  }

  if (isLocal) {
    const brevToUpdate = getMockDb(req).brev.find((b) => b.uuid === uuid);
    const svar: SvarRespons = req.body;
    if (brevToUpdate) {
      brevToUpdate.svar = {
        svarType: svar.svarType,
        svarTekst: svar.svarTekst,
        svarTidspunkt: new Date().toISOString(),
      };
    }
  }

  if (isDemoOrLocal) {
    return;
  } else {
    const svar: SvarRespons = req.body;
    await tokenXFetchPost({
      req,
      targetApi: TokenXTargetApi.ISDIALOGMOTE,
      endpoint: `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/arbeidstaker/brev/${uuid}/respons`,
      data: svar,
    });
  }

  res.status(200).end();
};
export default handler;
