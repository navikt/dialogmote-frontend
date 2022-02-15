import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { DialogmoteDataSM } from "@/server/data/types/internal/DialogmoteType";

export const DIALOGMOTEDATA_SM = "dialogmotedata-sykmeldt";

export const useDialogmoteDataSM = () => {
  const fetchDialogmoteData = () =>
    get<DialogmoteDataSM>(`/syk/poc/dialogmote/api/sykmeldt`);

  return useQuery(DIALOGMOTEDATA_SM, fetchDialogmoteData);
};
