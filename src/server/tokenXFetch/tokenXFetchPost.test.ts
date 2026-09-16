import type { NextApiRequest } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { object, string } from "zod";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { tokenXFetchPost } from "./tokenXFetchPost";

const mocks = vi.hoisted(() => ({
  error: vi.fn(),
  exchange: vi.fn(),
  post: vi.fn(),
  validate: vi.fn(),
}));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error },
}));

vi.mock("@/common/api/fetch", () => ({
  post: mocks.post,
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

const responseDataSchema = object({ value: string() });
const args = {
  req: {} as NextApiRequest,
  targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
  operation: RuntimeOperation.MOTEBEHOV_FETCH,
  endpoint: "https://syfomotebehov.invalid/api/v5/arbeidsgiver/motebehov/status",
  data: { narmesteLederId: "synthetic-leder-id" },
  responseDataSchema,
};

describe("tokenXFetchPost", () => {
  beforeEach(() => {
    mocks.error.mockReset();
    mocks.exchange.mockReset().mockResolvedValue("obo-token");
    mocks.post.mockReset();
    mocks.validate.mockReset().mockResolvedValue("idporten-token");
  });

  it("returnerer skjemavalidert respons uten errorlogg", async () => {
    mocks.post.mockResolvedValue({ value: "ok", ignored: "field" });

    await expect(tokenXFetchPost(args)).resolves.toEqual({ value: "ok" });
    expect(mocks.error).not.toHaveBeenCalled();
  });

  it("logger én POST-schemafeil uten responsdata", async () => {
    mocks.post.mockResolvedValue({ secret: "safe-canary" });

    await expect(tokenXFetchPost(args)).rejects.toEqual(
      expect.objectContaining({
        code: 500,
        message: "Upstream response did not match expected schema",
      }),
    );

    expect(mocks.error).toHaveBeenCalledOnce();
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "dialogmote_motebehov_fetch_failed",
        operation: "motebehov_fetch",
        error_code: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
        upstream: "syfomotebehov",
        method: "POST",
        validation_error: expect.stringContaining("value"),
      },
      "Upstream request failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toContain(
      "safe-canary",
    );
  });
});
