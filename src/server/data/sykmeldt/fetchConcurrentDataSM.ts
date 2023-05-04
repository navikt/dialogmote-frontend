import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import { getMotebehovSM } from "@/server/service/motebehovService";
import { getBrevSM } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getTokenX } from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import getMockDb from "@/server/data/mock/getMockDb";
import { logger } from "@navikt/next-logger";

export const fetchConcurrentDataSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehov = getMockDb(req).motebehov;
    res.brevArray = getMockDb(req).brev;
  } else {
    const token = req.idportenToken;
    const motebehovTokenXPromise = getTokenX(
      token,
      serverEnv.SYFOMOTEBEHOV_CLIENT_ID
    );
    const isDialogmoteTokenXPromise = getTokenX(
      token,
      serverEnv.ISDIALOGMOTE_CLIENT_ID
    );
    const [motebehovTokenX, isDialogmoteTokenX] = await Promise.all([
      motebehovTokenXPromise,
      isDialogmoteTokenXPromise,
    ]);
    logger.info("Exchanging SM tokenx ok");

    const motebehovPromise = getMotebehovSM(motebehovTokenX);
    const isDialogmotePromise = getBrevSM(isDialogmoteTokenX);

    const [motebehovRes, isDialogmoteRes] = await Promise.all([
      motebehovPromise,
      isDialogmotePromise,
    ]);
    logger.info("Fetching DM data SM ok");

    if (motebehovRes.success && isDialogmoteRes.success) {
      res.motebehov = motebehovRes.data;
      res.brevArray = isDialogmoteRes.data;
    } else if (!motebehovRes.success) {
      handleSchemaParsingError("Sykmeldt", "Motebehov", motebehovRes.error);
    } else if (!isDialogmoteRes.success) {
      handleSchemaParsingError(
        "Sykmeldt",
        "IsDialogmote",
        isDialogmoteRes.error
      );
    }
  }

  next();
};
