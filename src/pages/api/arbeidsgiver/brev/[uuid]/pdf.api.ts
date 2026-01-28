import { NextApiRequest, NextApiResponse } from "next";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { tokenXFetchGet } from "@/server/tokenXFetch/tokenXFetchGet";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const pdf = isMockBackend
    ? pdfMock
    : await tokenXFetchGet({
        req,
        targetApi: TokenXTargetApi.ISDIALOGMOTE,
        endpoint: `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/narmesteleder/brev/${req.query.uuid}/pdf`,
        responseType: "arraybuffer",
      });
  res
    .status(200)
    .setHeader("Content-Type", "application/pdf")
    .setHeader("Content-Disposition", 'inline; filename="brev.pdf"')
    .end(pdf);
};

export default handler;
