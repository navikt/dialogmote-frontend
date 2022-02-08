const isOpplaering: boolean = process.env["OPPLAERING"] === "true";
const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
const basePath: string = process.env["BASE_PATH"] as string;
const environment: string = process.env["ENVIRONMENT"] as string;
const decoratorEnv = process.env["DECORATOR_ENV"] === "prod" ? "prod" : "dev";
const dittSykefravaerUrl: string = process.env["NEXT_PUBLIC_DITT_SYKEFRAVAER_ROOT"] as string;
const dineSykmeldteUrl: string = process.env["NEXT_PUBLIC_DINE_SYKMELDTE_ROOT"] as string;

export { isOpplaering, isMockBackend, basePath, environment, decoratorEnv, dittSykefravaerUrl, dineSykmeldteUrl };
