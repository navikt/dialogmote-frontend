import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@navikt/next-logger";

import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";
import getMockDb from "@/server/data/mock/getMockDb";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { MotebehovSvarRequest } from "@/types/shared/motebehov";
import { MAX_LENGTH_MOTEBEHOV_SVAR_JSON } from "@/pages/api/constants";
import {
  meldMotebehovSMResponseFixture,
  svarMotebehovSMResponseFixture,
} from "mocks/data/fixtures/form";

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
      arbeidstakerFnr: data.sykmeldt!.fnr,
      virksomhetsnummer: data.sykmeldt!.orgnummer,
      behandletTidspunkt: null,
      behandletVeilederIdent: null,
      tildeltEnhet: null,
      opprettetAv: data.sykmeldt!.fnr,
      skjemaType: data.motebehov.skjemaType,
      innmelderType: "ARBEIDSTAKER",
      formValues: {
        harMotebehov: svar.harMotebehov,
        formSnapshot:
          data.motebehov.skjemaType === "SVAR_BEHOV"
            ? {
                formIdentifier: "motebehov-arbeidstaker-svar",
                formSemanticVersion: "1.0.0",
                fieldSnapshots: svarMotebehovSMResponseFixture,
              }
            : {
                formIdentifier: "motebehov-arbeidstaker-meld",
                formSemanticVersion: "1.0.0",
                fieldSnapshots: meldMotebehovSMResponseFixture,
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
      endpoint: `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/arbeidstaker/motebehov`,
      data: svar,
    });
  }
  res.status(200).end();
};
export default handler;
