import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { activeLabsMockAG } from "../mock/activeLabsMock";
import { getMotebehovAG } from "@/server/service/motebehovService";
import { getBrevAG } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getTokenX } from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";

export const fetchConcurrentDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.motebehov = activeLabsMockAG.motebehov;
      res.brevArray = activeLabsMockAG.brev;
    } else {
      res.motebehov = activeMockAG.motebehov;
      res.brevArray = activeMockAG.brev;
    }
  } else {
    const token = req.idportenToken;
    const motebehovTokenXPromise = getTokenX(
      token,
      serverEnv.SYFOMOTEBEHOV_CLIENT_ID
    );
    const [motebehovTokenX] = await Promise.all([motebehovTokenXPromise]);

    const motebehovPromise = getMotebehovAG(
      res.sykmeldt.fnr,
      res.sykmeldt.orgnummer,
      motebehovTokenX
    );
    //const brevPromise = getBrevAG(req.loginServiceToken, res.sykmeldt.fnr);

    const [motebehovRes] = await Promise.all([motebehovPromise]);

    if (motebehovRes.success) {
      res.motebehov = motebehovRes.data;
      res.brevArray = [];
    } else if (!motebehovRes.success) {
      handleSchemaParsingError("Arbeidsgiver", "Motebehov", motebehovRes.error);
    }
  }

  next();
};
