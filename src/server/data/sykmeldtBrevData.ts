import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv from "../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { get, post } from "@/common/api/axios/axios";
import { Brev, SvarRespons } from "@/common/api/types/brevTypes";
import activeMockDataSM from "@/server/data/mock/activeMockDataSM";

const brevApiSM = (path?: string): string => {
  const host = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`;

  return path ? `${host}${path}` : host;
};

export const fetchBrevSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { brevArray: Brev[] },
  next: () => void
) => {
  if (isMockBackend) {
    res.brevArray = activeMockDataSM.brev;
  } else {
    res.brevArray = await get(brevApiSM(), {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};

export const fetchBrevPdfSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { pdf: any }, //todo better typing and response PDF
  next: () => void
) => {
  if (isMockBackend) {
    res.pdf = pdfMock;
  } else {
    const { uuid } = req.query;
    res.pdf = await get(brevApiSM(`/${uuid}/pdf`), {
      accessToken: req.loginServiceToken,
      responseType: "blob",
    }); //hmz, kanskje bare ha pdf-genereringskoden inne her og serve det direkte herfra?
  }

  next();
};

export const postBrevLestSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const { uuid } = req.query;
    await post(brevApiSM(`/${uuid}/les`), undefined, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};

export const postBrevSvarSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const { uuid } = req.query;
    const svar: SvarRespons = req.body;
    await post(brevApiSM(`/${uuid}/respons`), svar, {
      accessToken: req.loginServiceToken,
    });
  }

  next();
};
