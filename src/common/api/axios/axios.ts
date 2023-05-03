import axios, { AxiosError, ResponseType } from "axios";
import { loginUser } from "@/common/utils/urlUtils";
import { displayTestScenarioSelector } from "@/common/publicEnv";
import { v4 as uuidv4 } from "uuid";
import { logServerError } from "@/server/utils/serverLogger";
import {
  accessDeniedError,
  ApiErrorException,
  generalError,
  loginRequiredError,
  networkError,
} from "@/common/api/axios/errors";

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

  if (displayTestScenarioSelector && typeof window !== "undefined") {
    let sessionId = localStorage.getItem(TEST_SESSION_ID);
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem(TEST_SESSION_ID, sessionId);
    }
    headers[TEST_SESSION_ID] = sessionId;
  }

  return headers;
};

function handleError(error: AxiosError, url: string, httpMethod: string) {
  logServerError(error, url, httpMethod);

  if (error.response) {
    switch (error.response.status) {
      case 401: {
        loginUser();
        throw new ApiErrorException(
          loginRequiredError(error),
          error.response.status
        );
      }
      case 403: {
        throw new ApiErrorException(
          accessDeniedError(error),
          error.response.status
        );
      }
      default:
        throw new ApiErrorException(generalError(error), error.response.status);
    }
  } else if (error.request) {
    throw new ApiErrorException(networkError(error));
  } else {
    throw new ApiErrorException(generalError(error));
  }
}

export const get = <ResponseData>(
  url: string,
  options?: AxiosOptions
): Promise<ResponseData> => {
  return axios
    .get(url, {
      headers: defaultRequestHeaders(options),
      responseType: options?.responseType,
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch(function (error) {
      handleError(error, url, "GET");
    });
};

export const post = <ResponseData>(
  url: string,
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
      handleError(error, url, "POST");
    });
};
