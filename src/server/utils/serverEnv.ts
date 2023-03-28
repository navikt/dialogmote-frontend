export interface IServerEnvironmentVariables {
  LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace";
  ISDIALOGMOTE_HOST: string;
  SYFOMOTEBEHOV_HOST: string;
  SYKMELDINGER_ARBEIDSGIVER_HOST: string;
  TOKEN_X_WELL_KNOWN_URL: string;
  TOKEN_X_CLIENT_ID: string;
  TOKEN_X_PRIVATE_JWK: string;
  TOKEN_X_AUDIENCE: string;
  IDPORTEN_WELL_KNOWN_URL: string;
  INGRESS: string;
  ISDIALOGMOTE_AUDIENCE: string;
  DECORATOR_ENV: "prod" | "dev";
  DITT_SYKEFRAVAER_ROOT: string;
  DINE_SYKMELDTE_ROOT: string;
  MOCK_BACKEND: string;
  UNLEASH_API_URL: string;
  IDPORTEN_CLIENT_ID: string;
  SYFOMOTEBEHOV_CLIENT_ID: string;
  SYKMELDINGER_ARBEIDSGIVER_CLIENT_ID: string;
  ISDIALOGMOTE_CLIENT_ID: string;
}

// TODO: Add assertions on required env variables
const serverEnv = process.env as unknown as IServerEnvironmentVariables;

export default serverEnv;
