import { describe, expect, it } from "vitest";
import { HttpError } from "@/common/utils/errors/HttpError";
import { shouldRetryQuery } from "./queryRetry";

describe("shouldRetryQuery", () => {
  describe("when the error is a 4xx HttpError that is not retriable", () => {
    it.each([400, 403, 404, 422])(
      "should return false for status %s when failureCount is 0",
      (statusCode) => {
        expect(shouldRetryQuery(0, new HttpError(statusCode))).toBe(false);
      },
    );

    it.each([400, 403, 404, 422])(
      "should return false for status %s when failureCount is 3",
      (statusCode) => {
        expect(shouldRetryQuery(3, new HttpError(statusCode))).toBe(false);
      },
    );
  });

  describe("when the error is a retriable HttpError", () => {
    it.each([408, 429, 500, 502, 503])(
      "should return true for status %s when failureCount is less than 3",
      (statusCode) => {
        expect(shouldRetryQuery(2, new HttpError(statusCode))).toBe(true);
      },
    );

    it.each([408, 429, 500, 502, 503])(
      "should return false for status %s when failureCount is 3 or more",
      (statusCode) => {
        expect(shouldRetryQuery(3, new HttpError(statusCode))).toBe(false);
        expect(shouldRetryQuery(4, new HttpError(statusCode))).toBe(false);
      },
    );
  });

  describe("when the error is not an HttpError", () => {
    it("should return true for a network error when failureCount is less than 3", () => {
      expect(shouldRetryQuery(2, new Error("Network error"))).toBe(true);
    });

    it("should return false for a network error when failureCount is 3 or more", () => {
      expect(shouldRetryQuery(3, new Error("Network error"))).toBe(false);
    });

    it("should return true for an unknown error when failureCount is less than 3", () => {
      expect(shouldRetryQuery(2, "unknown error")).toBe(true);
    });

    it("should return false for an unknown error when failureCount is 3 or more", () => {
      expect(shouldRetryQuery(3, "unknown error")).toBe(false);
    });
  });
});
