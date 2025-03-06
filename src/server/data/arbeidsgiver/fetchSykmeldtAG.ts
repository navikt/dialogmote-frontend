import { getSykmeldt } from "@/server/service/sykmeldtService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getDinesykmeldteBackendTokenX } from "@/server/auth/tokenx";
import getMockDb from "@/server/data/mock/getMockDb";
import { logger } from "@navikt/next-logger";
import { isMockBackend } from "@/server/utils/serverEnv";
import { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import { NextApiRequest } from "next";

export const fetchSykmeldtAG = async (
  req: NextApiRequest
): Promise<SykmeldtDTO | undefined> => {
  if (isMockBackend) {
    return getMockDb(req).sykmeldt;
  } else {
    const token = await getDinesykmeldteBackendTokenX(req);

    logger.info("Sykemeldinger AG tokenx exchange OK");

    const { narmestelederid } = <{ narmestelederid: string }>req.query;
    const sykmeldtRes = await getSykmeldt(narmestelederid, token);

    if (sykmeldtRes.success) {
      return sykmeldtRes.data;
    } else {
      handleSchemaParsingError("Arbeidsgiver", "Sykmeldt", sykmeldtRes.error);
    }
  }
};
