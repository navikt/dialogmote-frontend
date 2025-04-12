import { getMotebehovSM } from "@/server/service/motebehovService";
import { getBrevSM } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import {
  getIsdialogmoteTokenX,
  getMotebehovTokenX,
} from "@/server/auth/tokenx";
import getMockDb from "@/server/data/mock/getMockDb";
import { NextApiRequest } from "next";
import { isMockBackend } from "@/server/utils/serverEnv";
import { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import { Brev } from "../../../types/shared/brev";

export const fetchConcurrentDataSM = async (
  req: NextApiRequest
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

    const motebehovPromise = getMotebehovSM(motebehovToken);
    const isDialogmotePromise = getBrevSM(isDialogmoteToken);

    const [motebehovRes, isDialogmoteRes] = await Promise.all([
      motebehovPromise,
      isDialogmotePromise,
    ]);

    if (motebehovRes.success && isDialogmoteRes.success) {
      return { motebehov: motebehovRes.data, brevArray: isDialogmoteRes.data };
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
};
