import { IAuthenticatedRequest } from "../../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv from "../../../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import { pdfMock } from "@/server/data/sykmeldt/isDialogmote/mock/pdfMock";
import { get } from "@/common/api/axios/axios";

export const fetchBrevPdf = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { pdf: any }, //todo better typing and response PDF
  next: () => void
) => {
  if (isMockBackend) {
    res.pdf = pdfMock;
  } else {
    const { uuid } = req.query;
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev/${uuid}/pdf`;
    res.pdf = await get(url, {
      accessToken: req.loginServiceToken,
      responseType: "blob",
    }); //hmz, kanskje bare ha pdf-genereringskoden inne her og serve det direkte herfra?
  }

  next();
};
