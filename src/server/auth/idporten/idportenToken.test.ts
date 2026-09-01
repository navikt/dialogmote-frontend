import type { IncomingMessage } from "node:http";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { validateIdportenToken } from "./idportenToken";

const mocks = vi.hoisted(() => ({
  getToken: vi.fn(),
  validateToken: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
}));

vi.mock("@navikt/oasis", () => ({
  getToken: mocks.getToken,
  validateIdportenToken: mocks.validateToken,
}));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error, warn: mocks.warn },
}));

vi.mock("@/server/utils/serverEnv", () => ({
  default: { IDPORTEN_CLIENT_ID: "expected-client-id" },
  isMockBackend: false,
}));

describe("ID-porten token validation ownership", () => {
  beforeEach(() => {
    mocks.getToken.mockReset();
    mocks.validateToken.mockReset();
    mocks.error.mockReset();
    mocks.warn.mockReset();
  });

  it("logger utløpt token én gang som lukket WARN-hendelse", async () => {
    mocks.getToken.mockReturnValueOnce("secret-idporten-token");
    mocks.validateToken.mockResolvedValueOnce({
      ok: false,
      error: new Error("secret-expiry-detail"),
      errorType: "token expired",
    });

    await expect(validateIdportenToken({} as IncomingMessage)).resolves.toEqual(
      {
        success: false,
        reason: "Invalid idporten token",
      },
    );
    expect(mocks.error).not.toHaveBeenCalled();
    expect(mocks.warn).toHaveBeenCalledOnce();
    expect(mocks.warn).toHaveBeenCalledWith(
      {
        event_type: "idporten_token_expired",
        operation: "validate_idporten_token",
        error_code: "IDPORTEN_TOKEN_EXPIRED",
      },
      "ID-porten token expired",
    );
    expect(JSON.stringify(mocks.warn.mock.calls)).not.toMatch(
      /secret-idporten-token|secret-expiry-detail/,
    );
  });

  it("logger ukjent valideringssvikt én gang som lukket ERROR-hendelse", async () => {
    mocks.getToken.mockReturnValueOnce("secret-idporten-token");
    mocks.validateToken.mockResolvedValueOnce({
      ok: false,
      error: new Error("secret-provider-validation-detail"),
      errorType: "unknown",
    });

    await expect(validateIdportenToken({} as IncomingMessage)).resolves.toEqual(
      {
        success: false,
        reason: "Invalid idporten token",
      },
    );
    expect(mocks.warn).not.toHaveBeenCalled();
    expect(mocks.error).toHaveBeenCalledOnce();
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "idporten_token_validation_failed",
        operation: "validate_idporten_token",
        error_code: "IDPORTEN_TOKEN_VALIDATION_FAILED",
      },
      "ID-porten token validation failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toMatch(
      /secret-idporten-token|secret-provider-validation-detail/,
    );
  });
});
