import { useQuery } from "@tanstack/react-query";
import { get } from "@/common/api/axios/axios";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import { useApiBasePath } from "@/common/hooks/routeHooks";
import { DialogmoteData } from "types/shared/dialogmote";

export const DIALOGMOTEDATA_AG = "dialogmotedata-arbeidsgiver";

export const useDialogmoteDataAG = () => {
  const narmestelederid = useNarmesteLederId();
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () =>
    get<DialogmoteData>(
      `${apiBasePath}/hei/${narmestelederid}`,
      "fetchDialogmoteDataAGException"
    );

  return useQuery({
    queryKey: [DIALOGMOTEDATA_AG],
    queryFn: fetchDialogmoteData,
    enabled: !!narmestelederid,
    throwOnError: true,
  });
};
