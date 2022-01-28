export interface IServerEnvironmentVariables {
  LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace";
  ISDIALOGMOTE_HOST: string;
  SYFOMOTEBEHOV_HOST: string;
  SYFOOPPFOLGINGSPLANSERVICE_HOST: string;
  SYKMELDINGER_ARBEIDSGIVER_HOST: string;
  TOKEN_X_WELL_KNOWN_URL: string;
  TOKEN_X_CLIENT_ID: string;
  TOKEN_X_PRIVATE_JWK: string;
  TOKEN_X_AUDIENCE: string;
  IDPORTEN_WELL_KNOWN_URL: string;
  INGRESS: string;
  ISDIALOGMOTE_AUDIENCE: string;
}

// TODO: Add assertions on required env variables

// @ts-ignore
const serverEnv = process.env as IServerEnvironmentVariables;

export default serverEnv;
