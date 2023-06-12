import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import { getMotebehovSM } from "@/server/service/motebehovService";
import { getBrevSM } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import {
  getIsdialogmoteTokenX,
  getMotebehovTokenX,
} from "@/server/auth/tokenx";
import getMockDb from "@/server/data/mock/getMockDb";
import { logger } from "@navikt/next-logger";
import { isMockBackend } from "@/server/utils/serverEnv";

export const fetchConcurrentDataSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.motebehov = getMockDb(req).motebehov;
    res.brevArray = getMockDb(req).brev;
  } else {
    const motebehovTokenPromise = getMotebehovTokenX(req);
    const isDialogmoteTokenPromise = getIsdialogmoteTokenX(req);
    const [motebehovToken, isDialogmoteToken] = await Promise.all([
      motebehovTokenPromise,
      isDialogmoteTokenPromise,
    ]);
    logger.info("Exchanging SM tokenx ok");

    const motebehovPromise = getMotebehovSM(motebehovToken);
    const isDialogmotePromise = getBrevSM(isDialogmoteToken);

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
