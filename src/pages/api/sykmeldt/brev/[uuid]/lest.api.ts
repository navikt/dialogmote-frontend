import { NextApiRequest, NextApiResponse } from "next";
import { isDemoOrLocal, isLocal } from "@/common/publicEnv";
import getMockDb from "@/server/data/mock/getMockDb";
import { getIsdialogmoteTokenX } from "@/server/auth/tokenx";
import { post } from "@/common/api/axios/axios";
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
    const token = await getIsdialogmoteTokenX(req);

    const { uuid } = req.query;
    await post(
      `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/arbeidstaker/brev/${uuid}/les`,
      "postBrevLestSMException",
      undefined,
      {
        accessToken: token,
      }
    );
  }
  res.status(200).end();
};
export default handler;
