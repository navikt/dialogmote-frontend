import { logger } from "@navikt/next-logger";
import type { NextApiRequest } from "next";
import { isValidNarmestelederId } from "@/common/utils/validateNarmestelederId";
import { getDinesykmeldteBackendTokenX } from "@/server/auth/tokenx";
import getMockDb from "@/server/data/mock/getMockDb";
import type { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import { getSykmeldt } from "@/server/service/sykmeldtService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { isMockBackend } from "@/server/utils/serverEnv";

export const fetchSykmeldtAG = async (
  req: NextApiRequest,
): Promise<SykmeldtDTO | undefined> => {
  if (isMockBackend) {
    return getMockDb(req).sykmeldt;
  } else {
    const token = await getDinesykmeldteBackendTokenX(req);

    logger.info("Sykemeldinger AG tokenx exchange OK");

    const { narmestelederid } = <{ narmestelederid: string }>req.query;
    if (!isValidNarmestelederId(narmestelederid)) {
      logger.warn(
        "Received invalid narmestelederid in fetchSykmeldtAG; skipping backend fetch",
      );
      return undefined;
    }
    const sykmeldtRes = await getSykmeldt(narmestelederid, token);

    if (sykmeldtRes.success) {
      return sykmeldtRes.data;
    } else {
      handleSchemaParsingError("Arbeidsgiver", "Sykmeldt", sykmeldtRes.error);
    }
  }
};
