import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { useApiBasePath } from "@/common/hooks/routeHooks";
import { ApiErrorException } from "@/common/api/axios/errors";
import { useNotifications } from "@/context/NotificationContext";
import { DialogmoteData } from "types/shared/dialogmote";

export const DIALOGMOTEDATA_SM = "dialogmotedata-sykmeldt";

export const useDialogmoteDataSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () => get<DialogmoteData>(apiBasePath);

  const { displayNotification } = useNotifications();

  return useQuery<DialogmoteData, ApiErrorException>(
    DIALOGMOTEDATA_SM,
    fetchDialogmoteData,
    {
      onError: (err) => {
        displayNotification({
          variant: "error",
          message: err.error.defaultErrorMsg,
        });
      },
    }
  );
};
