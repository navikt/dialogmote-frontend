import { NextApiRequest, NextApiResponse } from "next";
import { MotebehovSvarRequestAG } from "../../../../types/shared/motebehov";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { getMotebehovTokenX } from "@/server/auth/tokenx";
import { post } from "@/common/api/axios/axios";
import getMockDb from "@/server/data/mock/getMockDb";
import { v4 as uuidv4 } from "uuid";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const svar: MotebehovSvarRequestAG = req.body;

  if (isMockBackend) {
    const data = getMockDb(req);
    getMockDb(req).motebehov.motebehov = {
      id: uuidv4(),
      opprettetDato: new Date().toISOString(),
      aktorId: "12345",
      arbeidstakerFnr: "12345678901",
      virksomhetsnummer: "123456789",
      motebehovSvar: {
        harMotebehov: svar.formSubmission.harMotebehov,
        forklaring: "placeholder-tekst", //TODO: Update when receipt is ready
      },
      behandletTidspunkt: null,
      behandletVeilederIdent: null,
      opprettetAv: "12345678901",
      skjemaType: data.motebehov.skjemaType,
      tildeltEnhet: null,
    };
  } else {
    const token = await getMotebehovTokenX(req);

    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/motebehov`,
      "postMotebehovAGException",
      svar,
      {
        accessToken: token,
      }
    );
  }
  res.status(200).end();
};
export default handler;
