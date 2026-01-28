import { useQuery } from "@tanstack/react-query";
import type { DialogmoteData } from "types/shared/dialogmote";
import { get } from "@/common/api/fetch";
import { useApiBasePath } from "@/common/hooks/routeHooks";

export const DIALOGMOTEDATA_SM = "dialogmotedata-sykmeldt";

export const useDialogmoteDataSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () => get<DialogmoteData>(apiBasePath);

  return useQuery({
    queryKey: [DIALOGMOTEDATA_SM],
    queryFn: fetchDialogmoteData,
    throwOnError: true,
  });
};
