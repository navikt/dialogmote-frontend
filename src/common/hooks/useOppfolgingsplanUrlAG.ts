import { useIsPilotAG } from "@/common/api/queries/arbeidsgiver/pilotQueriesAG";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import {
  nyOppfolgingsplanRoot,
  oppfolgingsplanUrlAG,
} from "@/common/publicEnv";

export const useOppfolgingsplanUrlAG = (
  sykmeldtFnr?: string,
  narmesteLederIdOverride?: string,
): string => {
  const narmesteLederId = useNarmesteLederId();
  const resolvedNarmesteLederId = narmesteLederIdOverride ?? narmesteLederId;
  const { data: isPilotUser } = useIsPilotAG(sykmeldtFnr);

  return isPilotUser && resolvedNarmesteLederId
    ? `${nyOppfolgingsplanRoot}/${resolvedNarmesteLederId}`
    : `${oppfolgingsplanUrlAG}/${resolvedNarmesteLederId ?? ""}`;
};
