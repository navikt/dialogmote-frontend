import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";

export const DIALOGMOTEDATA_AG = "dialogmotedata-arbeidsgiver";

export const useDialogmoteDataAG = (narmestelederId?: string) => {
  const fetchDialogmoteData = () =>
    get<DialogmoteData>(
      `/syk/poc/dialogmote/api/arbeidsgiver/${narmestelederId}`
    );

  return useQuery(DIALOGMOTEDATA_AG, fetchDialogmoteData, {
    enabled: !!narmestelederId,
  });
};
