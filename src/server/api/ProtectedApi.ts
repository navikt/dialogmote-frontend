import createError from "http-errors";
import { logger } from "@navikt/next-logger";

interface IAuthorizationHeaders {
  Authorization: string;
}

class ProtectedApi {
  private readonly authorizationHeaders: IAuthorizationHeaders;

  constructor(access_token: string | undefined) {
    this.authorizationHeaders = {
      Authorization: `Bearer ${access_token}`,
    };
  }

  private async do(
    method: "GET" | "POST",
    path: string,
    body?: string
  ): Promise<Response> {
    const headers: HeadersInit = {
      ...this.authorizationHeaders,
      Accept: "application/json",
    };

    if (method === "POST") {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      logger.error(
        { status: response.status, path, method },
        "api returned error"
      );
      throw createError(response.status, response.statusText);
    }

    return response;
  }

  public async get(path: string): Promise<unknown> {
    const response = await this.do("GET", path);
    return await response.json();
  }

  public async post(path: string, body?: string): Promise<unknown> {
    const response = await this.do("POST", path, body);
    return await response.json();
  }
}

export default ProtectedApi;
