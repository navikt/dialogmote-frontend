import { logger } from "@navikt/next-logger";
import type { NextApiRequest } from "next";
import {
  getIsdialogmoteTokenX,
  getMotebehovTokenX,
} from "@/server/auth/tokenx";
import getMockDb from "@/server/data/mock/getMockDb";
import { getBrevAG } from "@/server/service/brevService";
import { getMotebehovAG } from "@/server/service/motebehovService";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { isMockBackend } from "@/server/utils/serverEnv";
import type { Brev } from "../../../types/shared/brev";

export const fetchConcurrentDataAG = async (
  req: NextApiRequest,
  fnr: string,
  orgnummer: string,
): Promise<
  | {
      motebehov: MotebehovStatusDTO;
      brevArray: Brev[];
    }
  | undefined
> => {
  if (isMockBackend) {
    const mockData = getMockDb(req);
    return { motebehov: mockData.motebehov, brevArray: mockData.brev };
  } else {
    const motebehovTokenPromise = getMotebehovTokenX(req);
    const isDialogmoteTokenPromise = getIsdialogmoteTokenX(req);

    const [motebehovToken, isDialogmoteToken] = await Promise.all([
      motebehovTokenPromise,
      isDialogmoteTokenPromise,
    ]);

    const motebehovPromise = getMotebehovAG(motebehovToken, fnr, orgnummer);
    const isDialogmotePromise = getBrevAG(isDialogmoteToken, fnr);

    const [motebehovRes, isDialogmoteRes] = await Promise.all([
      motebehovPromise,
      isDialogmotePromise,
    ]);
    logger.info("Fetching DM data AG ok");

    if (motebehovRes.success && isDialogmoteRes.success) {
      return { motebehov: motebehovRes.data, brevArray: isDialogmoteRes.data };
    } else if (!motebehovRes.success) {
      handleSchemaParsingError("Arbeidsgiver", "Motebehov", motebehovRes.error);
    } else if (!isDialogmoteRes.success) {
      handleSchemaParsingError(
        "Arbeidsgiver",
        "IsDialogmote",
        isDialogmoteRes.error,
      );
    }
  }
};
