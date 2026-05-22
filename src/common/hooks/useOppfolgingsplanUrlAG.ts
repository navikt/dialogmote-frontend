import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import { nyOppfolgingsplanRoot } from "@/common/publicEnv";

export const useOppfolgingsplanUrlAG = (
  narmesteLederIdOverride?: string,
): string => {
  const narmesteLederId = useNarmesteLederId();
  const resolvedNarmesteLederId = narmesteLederIdOverride ?? narmesteLederId;

  return `${nyOppfolgingsplanRoot}/${resolvedNarmesteLederId ?? ""}`;
};
