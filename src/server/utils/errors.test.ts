import { describe, expect, it, vi } from "vitest";
import { handleQueryParamError } from "./errors";

const mocks = vi.hoisted(() => ({ error: vi.fn() }));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error },
}));

describe("query param errors", () => {
  it("logger en lukket hendelse uten rå parameterverdier", () => {
    expect(() => handleQueryParamError()).toThrow("Malformed query params");
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "dialogmote_query_param_invalid",
        operation: "validate_query_params",
        error_code: "INVALID_QUERY_PARAM",
      },
      "Malformed query params",
    );
  });
});
