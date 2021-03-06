import { useBrevUuid } from "@/common/hooks/useBrevUuid";
import { dineSykemeldteRoot, dittSykefravarRoot } from "@/common/publicEnv";
import { useRouter } from "next/router";

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

export const useLandingUrl = (): string => {
  const router = useRouter();
  const { isAudienceSykmeldt } = useAudience();
  const { narmestelederid } = router.query;

  if (isAudienceSykmeldt) {
    return "/sykmeldt";
  } else {
    return `/arbeidsgiver/${narmestelederid}`;
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
    return dittSykefravarRoot;
  } else {
    return dineSykemeldteRoot;
  }
};

export const useReferatPath = () => {
  const baseUrl = useLandingUrl();
  return `${baseUrl}/referat`;
};

export const usePdfPath = () => {
  const { isAudienceSykmeldt } = useAudience();
  const context = isAudienceSykmeldt ? "sykmeldt" : "arbeidsgiver";
  const brevuuid = useBrevUuid();
  return `/api/${context}/brev/${brevuuid}/pdf`;
};

export const useFeaturePath = () => {
  const router = useRouter();

  return `${router.basePath}/api/features`;
};
