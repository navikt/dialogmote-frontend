import { CustomError } from "ts-custom-error";

export class HttpError extends CustomError {
  readonly upstreamErrorCode?: "SYKMELDT_NOT_FOUND";
  public constructor(
    public code: number,
    message?: string,
    options?: ErrorOptions & { upstreamErrorCode?: "SYKMELDT_NOT_FOUND" },
  ) {
    super(message);
    if (options?.cause !== undefined) this.cause = options.cause;
    this.upstreamErrorCode = options?.upstreamErrorCode;
  }
}
