import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const isOpplaering: boolean = process.env["OPPLAERING"] === "true";
export const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
export const environment: string = process.env["ENVIRONMENT"] as string;
export const basePath = publicRuntimeConfig.basePath as string;
export const dineSykemeldteRoot =
  publicRuntimeConfig.dineSykemeldteRoot as string;
export const dittSykefravarRoot =
  publicRuntimeConfig.dittSykefravarRoot as string;
export const isDevelopment: boolean = process.env["NODE_ENV"] === "development";
export const oppfolgingsplanUrlSM: string = process.env
  .NEXT_PUBLIC_OPPFOLGINGSPLAN_PATH_SM as string;
export const oppfolgingsplanUrlAG: string = process.env
  .NEXT_PUBLIC_OPPFOLGINGSPLAN_PATH_AG as string;
