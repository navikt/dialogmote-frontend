import { useQuery } from "@tanstack/react-query";
import type { DialogmoteData } from "types/shared/dialogmote";
import { get } from "@/common/api/fetch";
import { useApiBasePath } from "@/common/hooks/routeHooks";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import { isSykmeldtNotFoundError } from "@/common/utils/errors/isSykmeldtNotFoundError";

export const DIALOGMOTEDATA_AG = "dialogmotedata-arbeidsgiver";

export const useDialogmoteDataAG = () => {
  const narmestelederid = useNarmesteLederId();
  const apiBasePath = useApiBasePath();

  const fetchDialogmoteData = () =>
    get<DialogmoteData>(`${apiBasePath}/${narmestelederid}`);

  return useQuery({
    queryKey: [DIALOGMOTEDATA_AG],
    queryFn: fetchDialogmoteData,
    enabled: !!narmestelederid,
    retry: (failureCount, error) => {
      if (isSykmeldtNotFoundError(error)) return false;
      return failureCount < 3;
    },
    throwOnError: (error) => !isSykmeldtNotFoundError(error),
  });
};
