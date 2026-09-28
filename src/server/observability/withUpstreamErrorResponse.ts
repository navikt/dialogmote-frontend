import type { NextApiHandler } from "next";
import { LoggedUpstreamError } from "./LoggedUpstreamError";

/** Consume diagnosed failures so Next does not emit a second, unstructured terminal log. */
export function withUpstreamErrorResponse(
  handler: NextApiHandler,
): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (!(error instanceof LoggedUpstreamError)) throw error;
      // These routes previously reached Next's generic HTTP 500 error response.
      res.status(500).end("Internal Server Error");
    }
  };
}
