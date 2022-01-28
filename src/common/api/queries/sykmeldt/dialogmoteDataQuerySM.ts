import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";

const DIALOGMOTEDATA_SM = "dialogmotedata-sykmeldt";

export const useDialogmoteDataSM = () => {
  const fetchDialogmoteData = () =>
    get<DialogmoteData>(`/syk/poc/dialogmote/api/sykmeldt`);

  return useQuery(DIALOGMOTEDATA_SM, fetchDialogmoteData);
};
