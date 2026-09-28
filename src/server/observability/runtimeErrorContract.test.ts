import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  FetchNetworkError,
  FetchResponseParseError,
} from "@/common/api/fetch/errors";
import { HttpError } from "@/common/utils/errors/HttpError";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import {
  logUpstreamRequestFailure,
  RuntimeOperation,
} from "./runtimeErrorContract";

const mocks = vi.hoisted(() => ({ error: vi.fn() }));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error },
}));

describe("runtime error contract", () => {
  beforeEach(() => {
    mocks.error.mockReset();
  });

  it.each([
    [99, false],
    [100, true],
    [599, true],
    [600, false],
  ])(
    "sender bare upstream_status for gyldig HTTP-status %s",
    (status, expected) => {
      logUpstreamRequestFailure({
        operation: RuntimeOperation.BREV_PDF_FETCH,
        targetApi: TokenXTargetApi.ISDIALOGMOTE,
        method: "GET",
        error: new HttpError(status, "safe error"),
      });

      const context = mocks.error.mock.calls[0]?.[0] as Record<string, unknown>;
      expect(context).not.toHaveProperty("status");
      if (expected) expect(context.upstream_status).toBe(status);
      else expect(context).not.toHaveProperty("upstream_status");
    },
  );

  it("bevarer transportårsak når lesing av responsbody feiler", () => {
    logUpstreamRequestFailure({
      operation: RuntimeOperation.BREV_PDF_FETCH,
      targetApi: TokenXTargetApi.ISDIALOGMOTE,
      method: "GET",
      error: new FetchResponseParseError("safe", "body_read", {
        cause: new TypeError("secret body detail", {
          cause: Object.assign(new Error("secret socket detail"), {
            code: "UND_ERR_BODY_TIMEOUT",
          }),
        }),
      }),
    });

    expect(mocks.error.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        error_code: "UND_ERR_BODY_TIMEOUT",
        cause_type: "Error",
        failure_stage: "response_parse",
      }),
    );
    expect(mocks.error.mock.calls[0]?.[0]).not.toHaveProperty("failure_kind");
    expect(JSON.stringify(mocks.error.mock.calls)).not.toMatch(/secret/);
  });

  it("beholder lukket kode når body-read-feil mangler kjent årsak", () => {
    logUpstreamRequestFailure({
      operation: RuntimeOperation.BREV_PDF_FETCH,
      targetApi: TokenXTargetApi.ISDIALOGMOTE,
      method: "GET",
      error: new FetchResponseParseError("safe", "body_read"),
    });

    expect(mocks.error.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        error_code: "UPSTREAM_RESPONSE_BODY_READ_FAILED",
        cause_type: "FetchResponseParseError",
      }),
    );
    expect(mocks.error.mock.calls[0]?.[0]).not.toHaveProperty("failure_kind");
  });

  it("klassifiserer nettverksfeil uten å logge feilobjektet", () => {
    logUpstreamRequestFailure({
      operation: RuntimeOperation.MOTEBEHOV_SUBMIT,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      method: "POST",
      error: new FetchNetworkError("secret network detail"),
    });

    expect(mocks.error).toHaveBeenCalledWith(
      expect.objectContaining({
        event_type: "dialogmote_motebehov_submit_failed",
        error_code: "UPSTREAM_NETWORK_ERROR",
        upstream: "syfomotebehov",
      }),
      "Kunne ikke sende møtebehov",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toContain(
      "secret network detail",
    );
    expect(mocks.error.mock.calls[0]?.[0]).not.toHaveProperty("endpoint");
  });
});
