import { loginUser } from "@/common/utils/urlUtils";
import { isDemoOrLocal } from "@/common/publicEnv";
import { v4 as uuidv4 } from "uuid";
import { logError } from "@/common/utils/logUtils";

export interface FetchOptions {
  accessToken?: string;
  responseType?: "json" | "arraybuffer";
  personIdent?: string;
  orgnummer?: string;
}

export const AUTHORIZATION_HEADER = "Authorization";
export const NAV_PERSONIDENT_HEADER = "nav-personident";
export const ORGNUMMER_HEADER = "orgnummer";
export const TEST_SESSION_ID = "testscenario-session-id";

const defaultRequestHeaders = (
  options?: FetchOptions
): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options?.accessToken) {
    headers[AUTHORIZATION_HEADER] = `Bearer ${options.accessToken}`;
  }

  if (options?.personIdent) {
    headers[NAV_PERSONIDENT_HEADER] = options.personIdent;
  }

  if (options?.orgnummer) {
    headers[ORGNUMMER_HEADER] = options.orgnummer;
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

const parseJsonResponse = async <ResponseData>(
  response: Response
): Promise<ResponseData> => {
  if (response.status === 204 || response.status === 205) {
    return undefined as ResponseData;
  }

  const text = await response.text();
  if (!text) {
    return undefined as ResponseData;
  }

  return JSON.parse(text) as ResponseData;
};

const parseResponse = async <ResponseData>(
  response: Response,
  responseType?: FetchOptions["responseType"]
): Promise<ResponseData> => {
  if (responseType === "arraybuffer") {
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer) as ResponseData;
  }

  return parseJsonResponse<ResponseData>(response);
};

const logAndThrowError = async (
  response: Response,
  requestUrl: string
): Promise<never> => {
  if (response.status === 401 && typeof window !== "undefined") {
    loginUser();
  }

  let bodySnippet = "";
  try {
    bodySnippet = (await response.text()).slice(0, 200);
  } catch {
    /* ignore response body */
  }

  const message = `Fetch failed (${response.status} ${response.statusText}) for ${requestUrl}${
    bodySnippet ? `: ${bodySnippet}` : ""
  }`;
  const error = new Error(message);
  logError(error);
  throw error;
};

const logAndThrowNetworkError = (error: unknown): never => {
  const err = error instanceof Error ? error : new Error("Network error");
  logError(err);
  throw err;
};

const logAndThrowParseError = (error: unknown, requestUrl: string): never => {
  const err =
    error instanceof Error
      ? error
      : new Error(`Failed to parse response for ${requestUrl}`);
  logError(err, "ResponseParse");
  throw err;
};

export const get = async <ResponseData>(
  url: string,
  options?: FetchOptions
): Promise<ResponseData> => {
  let response: Response | undefined;
  try {
    response = await fetch(encodeURI(url), {
      headers: defaultRequestHeaders(options),
      credentials: "include",
    });
  } catch (error) {
    logAndThrowNetworkError(error);
  }

  if (!response) {
    throw new Error("Fetch failed before receiving a response");
  }

  if (!response.ok) {
    return await logAndThrowError(response, url);
  }

  try {
    return await parseResponse<ResponseData>(response, options?.responseType);
  } catch (error) {
    logAndThrowParseError(error, url);
  }

  throw new Error("Unreachable");
};

export const post = async <ResponseData>(
  url: string,
  data?: unknown,
  options?: FetchOptions
): Promise<ResponseData> => {
  let response: Response | undefined;
  try {
    response = await fetch(url, {
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      headers: defaultRequestHeaders(options),
      credentials: "include",
    });
  } catch (error) {
    logAndThrowNetworkError(error);
  }

  if (!response) {
    throw new Error("Fetch failed before receiving a response");
  }

  if (!response.ok) {
    return await logAndThrowError(response, url);
  }

  try {
    return await parseResponse<ResponseData>(response, options?.responseType);
  } catch (error) {
    logAndThrowParseError(error, url);
  }

  throw new Error("Unreachable");
};
