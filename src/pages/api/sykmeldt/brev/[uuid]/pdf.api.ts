import { NextApiRequest, NextApiResponse } from "next";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { getIsdialogmoteTokenX } from "@/server/auth/tokenx";
import { get } from "@/common/api/axios/axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const pdf = isMockBackend
    ? pdfMock
    : await get(
        `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/arbeidstaker/brev/${req.query.uuid}/pdf`,
        "fetchBrevPdfSMException",
        {
          accessToken: await getIsdialogmoteTokenX(req),
          responseType: "arraybuffer",
        }
      );
  res
    .status(200)
    .setHeader("Content-Type", "application/pdf")
    .setHeader("Content-Disposition", 'inline; filename="brev.pdf"')
    .end(pdf);
};
export default handler;
