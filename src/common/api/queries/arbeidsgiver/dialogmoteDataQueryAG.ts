import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { DialogmoteDataAG } from "@/server/data/types/internal/DialogmoteType";

export const DIALOGMOTEDATA_AG = "dialogmotedata-arbeidsgiver";

export const useDialogmoteDataAG = (narmestelederId?: string) => {
  const fetchDialogmoteData = () =>
    get<DialogmoteDataAG>(
      `/syk/poc/dialogmote/api/arbeidsgiver/${narmestelederId}`
    );

  return useQuery(DIALOGMOTEDATA_AG, fetchDialogmoteData, {
    enabled: !!narmestelederId,
  });
};
