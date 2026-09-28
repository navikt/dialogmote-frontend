import { HttpError } from "@/common/utils/errors/HttpError";

/** The technical cause has already been diagnosed; only this safe error may leave the server client. */
export class LoggedUpstreamError extends HttpError {
  constructor(code = 500, message = "Upstream request failed") {
    super(code, message);
  }
}
