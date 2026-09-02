import type { NextApiRequest } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { object, string } from "zod";
import { HttpError } from "@/common/utils/errors/HttpError";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { tokenXFetchGet } from "./tokenXFetchGet";

const mocks = vi.hoisted(() => ({
  error: vi.fn(),
  exchange: vi.fn(),
  get: vi.fn(),
  validate: vi.fn(),
}));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error },
}));

vi.mock("@/common/api/fetch", () => ({
  get: mocks.get,
}));

vi.mock("@/server/auth/idporten/idportenToken", () => ({
  validateAndGetIdportenToken: mocks.validate,
}));

vi.mock("@/server/auth/tokenXExchange", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/server/auth/tokenXExchange")>();
  return {
    ...actual,
    exchangeIdPortenTokenForTokenXOboToken: mocks.exchange,
  };
});

const req = {} as NextApiRequest;
const endpoint =
  "https://isdialogmote.invalid/api/v2/arbeidstaker/brev?fnr=safe-canary";
const responseDataSchema = object({ value: string() });

const args = {
  req,
  targetApi: TokenXTargetApi.ISDIALOGMOTE,
  operation: RuntimeOperation.BREV_LIST_FETCH,
  endpoint,
  responseDataSchema,
};

describe("tokenXFetchGet", () => {
  beforeEach(() => {
    mocks.error.mockReset();
    mocks.exchange.mockReset().mockResolvedValue("obo-token");
    mocks.get.mockReset();
    mocks.validate.mockReset().mockResolvedValue("idporten-token");
  });

  it("returnerer skjemavalidert respons uten errorlogg", async () => {
    mocks.get.mockResolvedValue({ value: "ok", ignored: "field" });

    await expect(tokenXFetchGet(args)).resolves.toEqual({ value: "ok" });
    expect(mocks.error).not.toHaveBeenCalled();
  });

  it("logger nøyaktig én kanonisk HTTP-feil uten rå data", async () => {
    mocks.get.mockRejectedValue(
      new HttpError(503, "secret upstream body safe-canary"),
    );

    await expect(tokenXFetchGet(args)).rejects.toBeInstanceOf(HttpError);

    expect(mocks.error).toHaveBeenCalledOnce();
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "dialogmote_brev_list_fetch_failed",
        operation: "brev_list_fetch",
        error_code: "UPSTREAM_HTTP_ERROR",
        upstream: "isdialogmote",
        method: "GET",
        upstream_status: 503,
      },
      "Upstream request failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toContain("safe-canary");
    expect(mocks.error.mock.calls[0]?.[0]).not.toHaveProperty("endpoint");
  });

  it("logger nøyaktig én kanonisk skjemafeil uten responsdata", async () => {
    mocks.get.mockResolvedValue({ secret: "safe-canary" });

    await expect(tokenXFetchGet(args)).rejects.toEqual(
      expect.objectContaining({
        code: 500,
        message: "Upstream response did not match expected schema",
      }),
    );

    expect(mocks.error).toHaveBeenCalledOnce();
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "dialogmote_brev_list_fetch_failed",
        operation: "brev_list_fetch",
        error_code: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
        upstream: "isdialogmote",
        method: "GET",
        validation_error: expect.stringContaining("value"),
      },
      "Upstream request failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toContain("safe-canary");
    expect(mocks.error.mock.calls[0]?.[0]).not.toHaveProperty("endpoint");
  });
});
