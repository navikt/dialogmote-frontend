import { logger } from "@navikt/next-logger";
import type { NextApiRequest } from "next";
import { isValidNarmestelederId } from "@/common/utils/validateNarmestelederId";
import getMockDb from "@/server/data/mock/getMockDb";
import type { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import { getSykmeldt } from "@/server/service/sykmeldtService";
import { isMockBackend } from "@/server/utils/serverEnv";

export const fetchSykmeldtAG = async (
  req: NextApiRequest,
): Promise<SykmeldtDTO | undefined> => {
  if (isMockBackend) {
    return getMockDb(req).sykmeldt;
  } else {
    const { narmestelederid } = <{ narmestelederid: string }>req.query;
    if (!isValidNarmestelederId(narmestelederid)) {
      logger.warn(
        "Received invalid narmestelederid in fetchSykmeldtAG; skipping backend fetch",
      );
      return undefined;
    }
    return getSykmeldt(req, narmestelederid);
  }
};
