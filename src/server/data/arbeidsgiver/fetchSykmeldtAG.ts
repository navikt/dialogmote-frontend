import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { getSykmeldt } from "@/server/service/sykmeldtService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getSykmeldingerArbeidsgiverTokenX } from "@/server/auth/tokenx";
import getMockDb from "@/server/data/mock/getMockDb";
import { logger } from "@navikt/next-logger";
import { isMockBackend } from "@/server/utils/serverEnv";

export const fetchSykmeldtAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    // eslint-disable-next-line
    res.sykmeldt = getMockDb(req).sykmeldt!;
  } else {
    const token = await getSykmeldingerArbeidsgiverTokenX(req);

    logger.info("Sykemeldinger AG tokenx exchange OK");

    const { narmestelederid } = <{ narmestelederid: string }>req.query;
    const sykmeldtRes = await getSykmeldt(narmestelederid, token);

    if (sykmeldtRes.success) {
      res.sykmeldt = sykmeldtRes.data;
    } else {
      handleSchemaParsingError("Arbeidsgiver", "Sykmeldt", sykmeldtRes.error);
    }
  }

  next();
};
