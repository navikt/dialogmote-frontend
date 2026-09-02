export type FetchFailureReason = "network" | "invalid_json" | "body_read";

export type FetchResponseFailureReason = Exclude<FetchFailureReason, "network">;

export class FetchNetworkError extends Error {
  override readonly name = "FetchNetworkError";
  readonly failureReason = "network" as const;
}

export class FetchResponseParseError extends Error {
  override readonly name = "FetchResponseParseError";

  constructor(
    message?: string,
    readonly failureReason: FetchResponseFailureReason = "invalid_json",
  ) {
    super(message);
  }
}

export const isAbortError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  error.name === "AbortError";

export const getFetchFailureReason = (
  error: unknown,
): FetchFailureReason | undefined => {
  if (error instanceof FetchNetworkError) {
    return error.failureReason;
  }
  if (
    error instanceof FetchResponseParseError &&
    (error.failureReason === "invalid_json" ||
      error.failureReason === "body_read")
  ) {
    return error.failureReason;
  }

  return undefined;
};
