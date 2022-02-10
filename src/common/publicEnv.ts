export const isOpplaering: boolean = process.env["OPPLAERING"] === "true";
export const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
export const basePath: string = process.env["NEXT_PUBLIC_BASE_PATH"] as string;
export const environment: string = process.env["ENVIRONMENT"] as string;
export const decoratorEnv =
  process.env["DECORATOR_ENV"] === "dev" ? "dev" : "prod";
export const dineSykemeldteRoot = process.env[
  "NEXT_PUBLIC_DINE_SYKMELDTE_ROOT"
] as string;
export const dittSykefravarRoot = process.env[
  "NEXT_PUBLIC_DITT_SYKEFRAVAER_ROOT"
] as string;
