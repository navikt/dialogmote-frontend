import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponseSM } from "@/server/data/types/next/NextApiResponseSM";
import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";

export const combineDialogmoteDataSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSM,
  next: () => void
) => {
  res.dialogmoteData = {
    isSykmeldt: res.isSykmeldt,
    ...mapDialogmoteData(res.motebehovStatus, res.brevArray),
  };

  next();
};
