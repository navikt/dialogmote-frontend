import { useQuery } from "@tanstack/react-query";
import { get } from "@/common/api/axios/axios";
import { useApiBasePath } from "@/common/hooks/routeHooks";
import { DialogmoteData } from "types/shared/dialogmote";

export const DIALOGMOTEDATA_SM = "dialogmotedata-sykmeldt";

export const useDialogmoteDataSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () =>
    get<DialogmoteData>(apiBasePath, "fetchDialogmoteDataSMException");

  return useQuery<DialogmoteData, Error>(
    [DIALOGMOTEDATA_SM],
    fetchDialogmoteData,
    {
      useErrorBoundary: true,
    }
  );
};
