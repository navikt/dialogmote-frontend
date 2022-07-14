import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { activeLabsMockSM } from "../mock/activeLabsMock";
import { getMotebehovSM } from "@/server/service/motebehovService";
import { getBrevSM } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getTokenX } from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";

export const fetchConcurrentDataSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSM,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.motebehov = activeLabsMockSM.motebehov;
      res.brevArray = activeLabsMockSM.brev;
    } else {
      res.motebehov = activeMockSM.motebehov;
      res.brevArray = activeMockSM.brev;
    }
  } else {
    const token = req.idportenToken;
    const motebehovTokenXPromise = getTokenX(
      token,
      serverEnv.SYFOMOTEBEHOV_CLIENT_ID
    );
    const isDialogmoteTokenXPromise = getTokenX(
      token,
      "dev-gcp:teamsykefravr:isdialogmote"
    );
    const [motebehovTokenX, isDialogmoteTokenXP] = await Promise.all([
      motebehovTokenXPromise,
      isDialogmoteTokenXPromise,
    ]);
    serverLogger.info("Exchanging SM tokenX OK");

    const motebehovPromise = getMotebehovSM(motebehovTokenX);
    const isDialogmotePromise = getBrevSM(isDialogmoteTokenXP);

    const [motebehovRes, isDialogmoteRes] = await Promise.all([
      motebehovPromise,
      isDialogmotePromise,
    ]);
    serverLogger.info("Fetching SM data OK");

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
