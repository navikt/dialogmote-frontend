import { useRouter } from "next/router";
import {dineSykmeldteUrl, dittSykefravaerUrl} from "@/common/publicEnv";

export type Audience = "Sykmeldt" | "Arbeidsgiver";

export interface IUseAudience {
  audience: Audience;
  isAudienceSykmeldt: boolean;
}

export const useAudience = (): IUseAudience => {
  const router = useRouter();

  const isSykmeldt = router.pathname.startsWith("/sykmeldt");

  return isSykmeldt
    ? {
        audience: "Sykmeldt",
        isAudienceSykmeldt: true,
      }
    : {
        audience: "Arbeidsgiver",
        isAudienceSykmeldt: false,
      };
};

export const useRouteBasePath = (): string => {
  const router = useRouter();
  const { isAudienceSykmeldt } = useAudience();
  const { narmestelederid } = router.query;

  if (isAudienceSykmeldt) {
    return `${router.basePath}/sykmeldt`;
  } else {
    return `${router.basePath}/arbeidsgiver/${narmestelederid}`;
  }
};

export const useApiBasePath = (): string => {
  const router = useRouter();
  const { isAudienceSykmeldt } = useAudience();

  if (isAudienceSykmeldt) {
    return `${router.basePath}/api/sykmeldt`;
  } else {
    return `${router.basePath}/api/arbeidsgiver`;
  }
};

export const useSykefravaerBasePath = (): string => {
  const { isAudienceSykmeldt } = useAudience();

  if (isAudienceSykmeldt) {
    return dittSykefravaerUrl ?? '';
  } else {
    return dineSykmeldteUrl ?? '';
  }
};
