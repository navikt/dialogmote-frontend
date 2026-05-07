import { HttpError } from "@/common/utils/errors/HttpError";

export const shouldRetryQuery = (
  failureCount: number,
  error: unknown,
): boolean => {
  if (error instanceof HttpError) {
    return false;
  }

  return failureCount < 3;
};
