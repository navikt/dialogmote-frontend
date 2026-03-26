import { HttpError } from "@/common/utils/errors/HttpError";

export const isSykmeldtNotFoundError = (error: unknown): boolean => {
  return (
    error instanceof HttpError &&
    error.code === 404 &&
    error.message.includes("SYKMELDT_NOT_FOUND")
  );
};
