import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import { useApiBasePath } from "@/common/hooks/routeHooks";

export const DIALOGMOTEDATA_AG = "dialogmotedata-arbeidsgiver";

export const useDialogmoteDataAG = () => {
  const narmestelederid = useNarmesteLederId();
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () =>
    get<DialogmoteData>(`${apiBasePath}/${narmestelederid}`);

  return useQuery(DIALOGMOTEDATA_AG, fetchDialogmoteData, {
    enabled: !!narmestelederid,
  });
};
