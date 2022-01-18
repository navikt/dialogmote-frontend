import { IAuthenticatedRequest } from "../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv from "../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { get, post } from "@/common/api/axios/axios";
import { Brev, SvarRespons } from "@/common/api/types/brevTypes";
import isDialogmoteMockSetup1SM from "@/server/data/mock/brev/isDialogmoteMockSetup1SM";
import activeMockDataSM from "@/server/data/mock/activeMockDataSM";

export const fetchBrevPdfSM = async (
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

export const fetchBrevSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { brevArray: Brev[] },
  next: () => void
) => {
  if (isMockBackend) {
    res.brevArray = activeMockDataSM.brev;
  } else {
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`;
    res.brevArray = await get(url, { accessToken: req.loginServiceToken });
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
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev/${uuid}/les`;
    await post(url, undefined, {
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
    const url = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev/${uuid}/pdf`;
    await post(url, svar, { accessToken: req.loginServiceToken });
  }

  next();
};
