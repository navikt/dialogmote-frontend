import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@navikt/next-logger";

import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import getMockDb from "@/server/data/mock/getMockDb";
import { MAX_LENGTH_MOTEBEHOV_SVAR_JSON } from "@/pages/api/constants";
import { MotebehovSvarRequestAG } from "@/types/shared/motebehov";
import {
  meldMotebehovAGOutputFixture,
  svarMotebehovAGOutputFixture,
} from "mocks/data/fixtures/form";

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
      behandletTidspunkt: null,
      behandletVeilederIdent: null,
      tildeltEnhet: null,
      opprettetAv: "12345678901",
      skjemaType: data.motebehov.skjemaType,
      innmelderType: "ARBEIDSGIVER",
      formValues: {
        harMotebehov: svar.formSubmission.harMotebehov,
        formSnapshot:
          data.motebehov.skjemaType === "SVAR_BEHOV"
            ? {
                formIdentifier: "motebehov-arbeidsgiver-svar",
                formSemanticVersion: "1.0.0",
                fieldSnapshots: svarMotebehovAGOutputFixture,
              }
            : {
                formIdentifier: "motebehov-arbeidsgiver-meld",
                formSemanticVersion: "1.0.0",
                fieldSnapshots: meldMotebehovAGOutputFixture,
              },
      },
    };
  } else {
    const svarLength = JSON.stringify(svar).length;

    if (svarLength > MAX_LENGTH_MOTEBEHOV_SVAR_JSON) {
      logger.error(
        `Motebehov svar request is too large. Size: ${svarLength} characters`
      );
      res.status(413).end();
      return;
    }

    await tokenXFetchPost({
      req,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      endpoint: `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/motebehov`,
      data: svar,
    });
  }
  res.status(200).end();
};
export default handler;
