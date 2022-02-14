import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv from "../../utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { get, post } from "@/common/api/axios/axios";
import { SvarRespons } from "@/server/data/types/external/BrevTypes";
import activeMockSM from "@/server/data/mock/activeMockSM";

const brevApiSM = (path?: string): string => {
  const host = `${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`;

  return path ? `${host}${path}` : host;
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
      responseType: "arraybuffer",
    });
  }

  next();
};

export const postBrevLestSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    const { uuid } = req.query;
    const brevToUpdate = activeMockSM.brev.find((b) => b.uuid === uuid);
    brevToUpdate!!.lestDato = new Date().toISOString();
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
