import { describe, expect, it } from "vitest";
import { HttpError } from "@/common/utils/errors/HttpError";
import { isSykmeldtNotFoundError } from "@/common/utils/errors/isSykmeldtNotFoundError";

describe("isSykmeldtNotFoundError", () => {
  it("matches 404 errors with the dedicated error type", () => {
    expect(
      isSykmeldtNotFoundError(
        new HttpError(404, "Fetch failed", "SYKMELDT_NOT_FOUND"),
      ),
    ).toBe(true);
  });

  it("does not match errors that only mention the type in the message", () => {
    expect(
      isSykmeldtNotFoundError(
        new HttpError(
          404,
          'Fetch failed: {"error":"SYKMELDT_NOT_FOUND"}',
          "ANOTHER_ERROR",
        ),
      ),
    ).toBe(false);
  });
});
