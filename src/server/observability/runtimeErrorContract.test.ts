import { beforeEach, describe, expect, it, vi } from "vitest";
import { FetchNetworkError } from "@/common/api/fetch/errors";
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
      "Upstream request failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toContain(
      "secret network detail",
    );
    expect(mocks.error.mock.calls[0]?.[0]).not.toHaveProperty("endpoint");
  });
});
