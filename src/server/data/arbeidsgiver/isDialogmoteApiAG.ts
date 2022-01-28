import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv from "../../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { get, post } from "@/common/api/axios/axios";
import { SvarRespons } from "@/server/data/types/external/BrevTypes";

const brevApiAG = (path?: string): string => {
  const host = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/narmesteleder/brev`;

  return path ? `${host}${path}` : host;
};

export const fetchBrevPdfAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { pdf: any }, //todo better typing and response PDF
  next: () => void
) => {
  if (isMockBackend) {
    res.pdf = pdfMock;
  } else {
    const { uuid } = req.query;
    res.pdf = await get(brevApiAG(`/${uuid}/pdf`), {
      accessToken: req.loginServiceToken,
      responseType: "blob",
    }); //hmz, kanskje bare ha pdf-genereringskoden inne her og serve det direkte herfra?
  }

  next();
};

export const postBrevLestAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const { uuid } = req.query;
    await post(brevApiAG(`/${uuid}/les`), undefined, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};

export const postBrevSvarAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const { uuid } = req.query;
    const svar: SvarRespons = req.body;
    await post(brevApiAG(`/${uuid}/respons`), svar, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
