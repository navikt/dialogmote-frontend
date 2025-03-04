import { NextApiRequest, NextApiResponse } from "next";
import { MotebehovSvarRequest } from "../../../../types/shared/motebehov";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import getMockDb from "@/server/data/mock/getMockDb";
import { v4 as uuidv4 } from "uuid";
import { getMotebehovTokenX } from "@/server/auth/tokenx";
import { post } from "@/common/api/axios/axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
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
        forklaring: svar.begrunnelse || null,
      },
      behandletTidspunkt: null,
      behandletVeilederIdent: null,
      // eslint-disable-next-line
      opprettetAv: data.sykmeldt!.fnr,
      skjemaType: data.motebehov.skjemaType,
      tildeltEnhet: null,
    };
  } else {
    const token = await getMotebehovTokenX(req);

    // TODO: Add validation?

    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov`,
      "postMotebehovSMException",
      svar,
      {
        accessToken: token,
      }
    );
  }
  res.status(200).end();
};
export default handler;
