import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";

export const combineDialogmoteDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  res.dialogmoteData = {
    sykmeldtName: res.sykmeldt.navn,
    ...mapDialogmoteData(
      !!res.sykmeldt.aktivSykmelding,
      res.motebehovStatus,
      res.brevArray
    ),
  };

  next();
};
