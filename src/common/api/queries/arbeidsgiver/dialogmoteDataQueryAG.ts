import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import { useApiBasePath } from "@/common/hooks/routeHooks";
import { useNotifications } from "@/context/NotificationContext";
import { ApiErrorException } from "@/common/api/axios/errors";

export const DIALOGMOTEDATA_AG = "dialogmotedata-arbeidsgiver";

export const useDialogmoteDataAG = () => {
  const narmestelederid = useNarmesteLederId();
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () =>
    get<DialogmoteData>(`${apiBasePath}/${narmestelederid}`);

  const { displayNotification } = useNotifications();

  return useQuery<DialogmoteData, ApiErrorException>(
    DIALOGMOTEDATA_AG,
    fetchDialogmoteData,
    {
      enabled: !!narmestelederid,
      onError: (err) => {
        displayNotification({
          variant: "error",
          message: err.error.defaultErrorMsg,
        });
      },
    }
  );
};
