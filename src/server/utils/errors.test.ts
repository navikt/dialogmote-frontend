import { describe, expect, it, vi } from "vitest";
import { handleQueryParamError } from "./errors";

const mocks = vi.hoisted(() => ({ error: vi.fn() }));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error },
}));

describe("query param errors", () => {
  it("logger en lukket hendelse uten rå parameterverdier", () => {
    const secret = "session-01017012345";

    expect(() => handleQueryParamError(secret)).toThrow(
      "Malformed query params",
    );
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "dialogmote_query_param_invalid",
        operation: "validate_query_params",
        error_code: "INVALID_QUERY_PARAM",
      },
      "Malformed query params",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toContain(secret);
  });
});
