import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { getMotebehovAG } from "@/server/service/motebehovService";
import { getBrevAG } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import getMockDb from "@/server/data/mock/getMockDb";
import { logger } from "@navikt/next-logger";
import {
  getIsdialogmoteTokenX,
  getMotebehovTokenX,
} from "@/server/auth/tokenx";

export const fetchConcurrentDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
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
    logger.info("Exchanging AG tokenx ok");

    const motebehovPromise = getMotebehovAG(
      motebehovToken,
      res.sykmeldt.fnr,
      res.sykmeldt.orgnummer
    );
    const isDialogmotePromise = getBrevAG(isDialogmoteToken, res.sykmeldt.fnr);

    const [motebehovRes, isDialogmoteRes] = await Promise.all([
      motebehovPromise,
      isDialogmotePromise,
    ]);
    logger.info("Fetching DM data AG ok");

    if (motebehovRes.success && isDialogmoteRes.success) {
      res.motebehov = motebehovRes.data;
      res.brevArray = isDialogmoteRes.data;
    } else if (!motebehovRes.success) {
      handleSchemaParsingError("Arbeidsgiver", "Motebehov", motebehovRes.error);
    } else if (!isDialogmoteRes.success) {
      handleSchemaParsingError(
        "Arbeidsgiver",
        "IsDialogmote",
        isDialogmoteRes.error
      );
    }
  }

  next();
};
