import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const isOpplaering: boolean = process.env["OPPLAERING"] === "true";
export const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
export const environment: string = process.env["ENVIRONMENT"] as string;
export const decoratorEnv =
  process.env["DECORATOR_ENV"] === "dev" ? "dev" : "prod";
export const basePath = publicRuntimeConfig.basePath as string;
export const dineSykemeldteRoot =
  publicRuntimeConfig.dineSykemeldteRoot as string;
export const dittSykefravarRoot =
  publicRuntimeConfig.dittSykefravarRoot as string;
export const isDevelopment: boolean = process.env["NODE_ENV"] === "development";
