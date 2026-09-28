/** Copy only recognised platform codes and error types, never messages or client objects. */
const transportCodes = [
  "ENOTFOUND",
  "EAI_AGAIN",
  "ETIMEDOUT",
  "ECONNABORTED",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
  "UND_ERR_BODY_TIMEOUT",
  "ECONNREFUSED",
  "ECONNRESET",
  "EPIPE",
  "UND_ERR_SOCKET",
  "CERT_HAS_EXPIRED",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "ERR_TLS_CERT_ALTNAME_INVALID",
] as const;

const causeTypes = [
  "Error",
  "TypeError",
  "SyntaxError",
  "TimeoutError",
  "AbortError",
  "AggregateError",
] as const;

export type TransportFailureDiagnostics = {
  error_code?: (typeof transportCodes)[number];
  cause_type?: (typeof causeTypes)[number];
};

function isTransportCode(
  value: unknown,
): value is NonNullable<TransportFailureDiagnostics["error_code"]> {
  return transportCodes.some((code) => code === value);
}

function isCauseType(
  value: unknown,
): value is NonNullable<TransportFailureDiagnostics["cause_type"]> {
  return causeTypes.some((type) => type === value);
}

export function transportFailureDiagnostics(
  error: unknown,
): TransportFailureDiagnostics {
  const diagnostics: TransportFailureDiagnostics = {};
  const seen = new Set<unknown>();
  let cause = error;
  for (
    let depth = 0;
    depth < 8 &&
    typeof cause === "object" &&
    cause !== null &&
    !seen.has(cause);
    depth++
  ) {
    seen.add(cause);
    if ("name" in cause && isCauseType(cause.name))
      diagnostics.cause_type = cause.name;
    if ("code" in cause && isTransportCode(cause.code)) {
      diagnostics.error_code = cause.code;
      return diagnostics;
    }
    cause = "cause" in cause ? cause.cause : undefined;
  }
  return diagnostics;
}
