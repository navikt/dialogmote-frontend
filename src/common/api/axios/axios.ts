import axios, { AxiosError, ResponseType } from "axios";
import { loginUser } from "@/common/utils/urlUtils";
import { isDemoOrLocal } from "@/common/publicEnv";
import { v4 as uuidv4 } from "uuid";
import { ErrorType, logError } from "../../utils/logUtils";

interface AxiosOptions {
  accessToken?: string;
  responseType?: ResponseType;
  personIdent?: string;
  orgnummer?: string;
}

export const AUTHORIZATION_HEADER = "Authorization";
export const NAV_PERSONIDENT_HEADER = "nav-personident";
export const ORGNUMMER_HEADER = "orgnummer";
export const TEST_SESSION_ID = "testscenario-session-id";

const defaultRequestHeaders = (
  options?: AxiosOptions
): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options?.accessToken) {
    headers[AUTHORIZATION_HEADER] = `Bearer ${options.accessToken}`;
  }

  if (options?.personIdent) {
    headers[NAV_PERSONIDENT_HEADER] = options?.personIdent;
  }

  if (options?.orgnummer) {
    headers[ORGNUMMER_HEADER] = options?.orgnummer;
  }

  if (isDemoOrLocal && typeof window !== "undefined") {
    let sessionId = localStorage.getItem(TEST_SESSION_ID);
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem(TEST_SESSION_ID, sessionId);
    }
    headers[TEST_SESSION_ID] = sessionId;
  }

  return headers;
};

function handleError(error: AxiosError, errorType: ErrorType) {
  if (error.response && error.response.status === 401) {
    loginUser();
  } else {
    logError(error, errorType);

    throw new Error(error.message);
  }
}

export const get = <ResponseData>(
  url: string,
  errorType: ErrorType,
  options?: AxiosOptions
): Promise<ResponseData> => {
  return axios
    .get(encodeURI(url), {
      headers: defaultRequestHeaders(options),
      responseType: options?.responseType,
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch(function (error) {
      handleError(error, errorType);
    });
};

export const post = <ResponseData>(
  url: string,
  errorType: ErrorType,
  // eslint-disable-next-line
  data?: any,
  options?: AxiosOptions
): Promise<ResponseData> => {
  return axios
    .post(url, data, {
      headers: defaultRequestHeaders(options),
      responseType: options?.responseType,
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch(function (error) {
      handleError(error, errorType);
    });
};
