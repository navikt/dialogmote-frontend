import { HttpError } from "@/common/utils/errors/HttpError";

export const shouldRetryQuery = (failureCount: number, error: unknown) => {
  if (
    error instanceof HttpError &&
    error.code >= 400 &&
    error.code < 500 &&
    error.code !== 408 &&
    error.code !== 429
  ) {
    return false;
  }

  return failureCount < 3;
};
