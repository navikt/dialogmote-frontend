import { getMotebehovAG } from "@/server/service/motebehovService";
import { getBrevAG } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import getMockDb from "@/server/data/mock/getMockDb";
import { logger } from "@navikt/next-logger";
import {
  getIsdialogmoteTokenX,
  getMotebehovTokenX,
} from "@/server/auth/tokenx";
import { isMockBackend } from "@/server/utils/serverEnv";
import { NextApiRequest } from "next";
import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";
import { Brev } from "../../../types/shared/brev";

export const fetchConcurrentDataAG = async (
  req: NextApiRequest,
  fnr: string,
  orgnummer: string
): Promise<
  | {
      motebehov: MotebehovDTO;
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
        isDialogmoteRes.error
      );
    }
  }
};
