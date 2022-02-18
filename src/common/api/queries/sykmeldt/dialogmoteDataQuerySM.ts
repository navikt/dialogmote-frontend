import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { useApiBasePath } from "@/common/hooks/routeHooks";

export const DIALOGMOTEDATA_SM = "dialogmotedata-sykmeldt";

export const useDialogmoteDataSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () => get<DialogmoteData>(apiBasePath);

  return useQuery(DIALOGMOTEDATA_SM, fetchDialogmoteData);
};
