import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const isOpplaering: boolean = process.env["OPPLAERING"] === "true";
const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
const basePath: string = process.env["BASE_PATH"] as string;
const environment: string = process.env["ENVIRONMENT"] as string;
const decoratorEnv = process.env["DECORATOR_ENV"] === "prod" ? "prod" : "dev";

export function dittSykefravaerUrl() {
    return publicRuntimeConfig.dittSykefravaerUrl
}

export function dineSykmeldteUrl() {
    return publicRuntimeConfig.dineSykmeldteUrl
}

export { isOpplaering, isMockBackend, basePath, environment, decoratorEnv };
