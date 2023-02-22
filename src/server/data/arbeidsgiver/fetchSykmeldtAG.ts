import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { getSykmeldt } from "@/server/service/sykmeldtService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getTokenX } from "@/server/auth/tokenx";
import serverLogger from "@/server/utils/serverLogger";
import serverEnv from "@/server/utils/serverEnv";
import getMockDb from "@/server/data/mock/getMockDb";

export const fetchSykmeldtAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    // eslint-disable-next-line
    res.sykmeldt = getMockDb(req).sykmeldt!;
  } else {
    const idportenToken = req.idportenToken;

    const tokenx = await getTokenX(
      idportenToken,
      serverEnv.SYKMELDINGER_ARBEIDSGIVER_CLIENT_ID
    );

    serverLogger.info("Sykemeldinger AG tokenx exchange OK");

    const { narmestelederid } = <{ narmestelederid: string }>req.query;
    const sykmeldtRes = await getSykmeldt(narmestelederid, tokenx);

    if (sykmeldtRes.success) {
      res.sykmeldt = sykmeldtRes.data;
    } else {
      handleSchemaParsingError("Arbeidsgiver", "Sykmeldt", sykmeldtRes.error);
    }
  }

  next();
};
