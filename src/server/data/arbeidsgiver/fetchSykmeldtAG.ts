import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { activeLabsMockAG } from "../mock/activeLabsMock";
import { getSykmeldt } from "@/server/service/sykmeldtService";

export const fetchSykmeldtAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.sykmeldt = activeLabsMockAG.sykmeldt!!;
    } else {
      res.sykmeldt = activeMockAG.sykmeldt!!;
    }
  } else {
    const { narmestelederid } = req.query;
    res.sykmeldt = await getSykmeldt(
      narmestelederid as string,
      req.loginServiceToken
    );
  }

  next();
};
