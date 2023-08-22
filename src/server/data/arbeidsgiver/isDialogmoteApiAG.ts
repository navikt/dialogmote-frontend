import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv, { isMockBackend } from "../../utils/serverEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { get, post } from "@/common/api/axios/axios";
import { SvarRespons } from "types/shared/brev";
import { getIsdialogmoteTokenX } from "@/server/auth/tokenx";
import getMockDb from "@/server/data/mock/getMockDb";
import { isDemoOrLocal, isLocal } from "@/common/publicEnv";

const brevApiAG = (path?: string): string => {
  const host = `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/narmesteleder/brev`;

  return path ? `${host}${path}` : host;
};

export const fetchBrevPdfAG = async (
  req: IAuthenticatedRequest,
  // eslint-disable-next-line
  res: NextApiResponse & { pdf: any }, //todo better typing and response PDF
  next: () => void
) => {
  if (isMockBackend) {
    res.pdf = pdfMock;
  } else {
    const token = await getIsdialogmoteTokenX(req);

    const { uuid } = req.query;
    res.pdf = await get(brevApiAG(`/${uuid}/pdf`), "fetchBrevPdfAGException", {
      accessToken: token,
      responseType: "arraybuffer",
    });
  }

  next();
};

export const postBrevLestAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isLocal) {
    const { uuid } = req.query;
    const brevToUpdate = getMockDb(req).brev.find((b) => b.uuid === uuid);
    if (brevToUpdate) {
      brevToUpdate.lestDato = new Date().toISOString();
    }
  }
  if (isDemoOrLocal) {
    return next();
  } else {
    const token = await getIsdialogmoteTokenX(req);

    const { uuid } = req.query;
    await post(
      brevApiAG(`/${uuid}/les`),
      "postBrevLestAGException",
      undefined,
      {
        accessToken: token,
      }
    );
  }

  next();
};

export const postBrevSvarAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isLocal) {
    const { uuid } = req.query;
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
    return next();
  } else {
    const token = await getIsdialogmoteTokenX(req);

    const { uuid } = req.query;
    const svar: SvarRespons = req.body;
    await post(brevApiAG(`/${uuid}/respons`), "postBrevSvarAGException", svar, {
      accessToken: token,
    });
  }

  next();
};
