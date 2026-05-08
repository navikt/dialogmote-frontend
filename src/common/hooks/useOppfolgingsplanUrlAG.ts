import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import { nyOppfolgingsplanRoot } from "@/common/publicEnv";

export const useOppfolgingsplanUrlAG = (
  narmesteLederIdOverride?: string,
): string | undefined => {
  const narmesteLederId = useNarmesteLederId();
  const resolvedNarmesteLederId = narmesteLederIdOverride ?? narmesteLederId;

  return resolvedNarmesteLederId
    ? `${nyOppfolgingsplanRoot}/${resolvedNarmesteLederId}`
    : undefined;
};
