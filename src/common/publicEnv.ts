export const basePath = process.env.NEXT_PUBLIC_BASEPATH as string;

export const dineSykemeldteRoot =
  process.env.NEXT_PUBLIC_DINE_SYKMELDTE_URL || "";

export const dittSykefravarRoot =
  process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_URL || "";

export const cdnPublicPath: string | undefined = process.env
  .NEXT_PUBLIC_ASSET_PREFIX
  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/public`
  : (process.env.NEXT_PUBLIC_BASEPATH ?? "");

export const minSideRoot = process.env.NEXT_PUBLIC_MIN_SIDE_ROOT as string;
export const oppfolgingsplanUrlSM: string = process.env
  .NEXT_PUBLIC_OPPFOLGINGSPLAN_PATH_SM as string;
export const oppfolgingsplanUrlAG: string = process.env
  .NEXT_PUBLIC_OPPFOLGINGSPLAN_PATH_AG as string;
export const nyOppfolgingsplanRoot: string = process.env
  .NEXT_PUBLIC_NY_OPPFOLGINGSPLAN_ROOT as string;

export const isDemoOrLocal =
  process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true" ||
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo";

export const isLocal = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true";
