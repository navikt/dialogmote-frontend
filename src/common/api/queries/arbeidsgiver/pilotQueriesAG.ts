import { useQuery } from "@tanstack/react-query";
import { get } from "@/common/api/fetch";
import { useApiBasePath } from "@/common/hooks/routeHooks";

export const useIsPilotAG = (personIdent?: string) => {
  const apiBasePath = useApiBasePath();

  const fetchPilotStatus = () =>
    get<boolean>(`${apiBasePath}/pilot`, { personIdent });

  return useQuery({
    queryKey: ["pilot", "arbeidsgiver", personIdent],
    queryFn: fetchPilotStatus,
    enabled: !!personIdent,
    throwOnError: false,
  });
};
