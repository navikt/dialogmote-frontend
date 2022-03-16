import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";

export const combineDialogmoteDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  res.dialogmoteData = mapDialogmoteData(
    res.motebehovStatus,
    res.brevArray,
    res.sykmeldt
  );

  next();
};
