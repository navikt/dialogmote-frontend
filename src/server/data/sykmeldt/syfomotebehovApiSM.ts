import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { post } from "@/common/api/axios/axios";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { getMotebehovTokenX } from "@/server/auth/tokenx";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import getMockDb from "@/server/data/mock/getMockDb";
import { v4 as uuidv4 } from "uuid";

export const postMotebehovSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const svar: MotebehovSvarRequest = req.body;

  if (isMockBackend) {
    const data = getMockDb(req);
    getMockDb(req).motebehov.motebehov = {
      id: uuidv4(),
      opprettetDato: new Date().toISOString(),
      aktorId: "12345",
      // eslint-disable-next-line
      arbeidstakerFnr: data.sykmeldt!.fnr,
      // eslint-disable-next-line
      virksomhetsnummer: data.sykmeldt!.orgnummer,
      motebehovSvar: {
        harMotebehov: svar.harMotebehov,
        forklaring: svar.forklaring || null,
      },
      behandletTidspunkt: null,
      behandletVeilederIdent: null,
      // eslint-disable-next-line
      opprettetAv: data.sykmeldt!.fnr,
      skjemaType: data.motebehov.skjemaType,
      tildeltEnhet: null,
    };

    return next();
  } else {
    const token = await getMotebehovTokenX(req);

    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov`,
      "postMotebehovSMException",
      svar,
      {
        accessToken: token,
      }
    );
  }

  next();
};
