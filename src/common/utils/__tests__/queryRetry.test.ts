import { describe, expect, it } from "vitest";
import { HttpError } from "@/common/utils/errors/HttpError";
import { shouldRetryQuery } from "../queryRetry";

describe("queryRetry", () => {
  it("does not retry 4xx errors except request timeout and too many requests", () => {
    expect(shouldRetryQuery(0, new HttpError(400))).toBe(false);
    expect(shouldRetryQuery(0, new HttpError(404))).toBe(false);
    expect(shouldRetryQuery(0, new HttpError(499))).toBe(false);
  });

  it("retries request timeout while retry attempts remain", () => {
    expect(shouldRetryQuery(0, new HttpError(408))).toBe(true);
    expect(shouldRetryQuery(2, new HttpError(408))).toBe(true);
    expect(shouldRetryQuery(3, new HttpError(408))).toBe(false);
  });

  it("retries too many requests while retry attempts remain", () => {
    expect(shouldRetryQuery(0, new HttpError(429))).toBe(true);
    expect(shouldRetryQuery(2, new HttpError(429))).toBe(true);
    expect(shouldRetryQuery(3, new HttpError(429))).toBe(false);
  });

  it("retries non-4xx errors while retry attempts remain", () => {
    expect(shouldRetryQuery(0, new HttpError(500))).toBe(true);
    expect(shouldRetryQuery(2, new Error("Network error"))).toBe(true);
    expect(shouldRetryQuery(3, new HttpError(500))).toBe(false);
  });
});
