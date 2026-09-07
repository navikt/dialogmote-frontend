import { beforeEach, describe, expect, it, vi } from "vitest";
import { validateToken } from "./verifyIdportenToken";

const mocks = vi.hoisted(() => ({
  validateIdportenToken: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
}));

vi.mock("@navikt/oasis", () => ({
  validateIdportenToken: mocks.validateIdportenToken,
}));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error, warn: mocks.warn },
}));

vi.mock("@/server/utils/serverEnv", () => ({
  default: { IDPORTEN_CLIENT_ID: "expected-client-id" },
}));

describe("verifyIdportenToken", () => {
  beforeEach(() => {
    mocks.validateIdportenToken.mockReset();
    mocks.error.mockReset();
    mocks.warn.mockReset();
  });

  it.each([
    "ERR_JWT_EXPIRED",
    "ERR_JWT_CLAIM_VALIDATION_FAILED",
    "ERR_JWT_INVALID",
    "ERR_JWS_INVALID",
    "ERR_JWS_SIGNATURE_VERIFICATION_FAILED",
    "ERR_JOSE_ALG_NOT_ALLOWED",
  ])("beholder %s som ugyldig token", async (code) => {
    mocks.validateIdportenToken.mockResolvedValueOnce({
      ok: false,
      errorType: "unknown",
      error: Object.assign(new Error("private token detail"), { code }),
    });

    await expect(validateToken("test-token")).resolves.toBe(false);
    expect(mocks.error).toHaveBeenCalledExactlyOnceWith(
      {
        event_type: "idporten_token_validation_failed",
        operation: "validate_idporten_token",
        error_code: "IDPORTEN_TOKEN_VALIDATION_FAILED",
      },
      "ID-porten token validation failed",
    );
  });

  it.each(["ERR_JWKS_TIMEOUT", "ERR_JWKS_INVALID", "ERR_JWKS_NO_MATCHING_KEY"])(
    "behandler %s som teknisk feil",
    async (code) => {
      mocks.validateIdportenToken.mockResolvedValueOnce({
        ok: false,
        errorType: "unknown",
        error: Object.assign(new Error("private signing key detail"), { code }),
      });

      await expect(validateToken("test-token")).rejects.toMatchObject({
        code: 500,
      });
      expect(mocks.error).toHaveBeenCalledExactlyOnceWith(
        {
          event_type: "idporten_token_validation_failed",
          operation: "validate_idporten_token",
          error_code: "IDPORTEN_TOKEN_VALIDATION_ERROR",
        },
        "ID-porten token validation failed",
      );
    },
  );

  it.each(["Level4", "idporten-loa-high"])(
    "godtar gyldig token med %s",
    async (acr) => {
      mocks.validateIdportenToken.mockResolvedValueOnce({
        ok: true,
        payload: { client_id: "expected-client-id", acr },
      });

      await expect(validateToken("test-token")).resolves.toBe(true);
      expect(mocks.error).not.toHaveBeenCalled();
      expect(mocks.warn).not.toHaveBeenCalled();
    },
  );

  it("klassifiserer avvist Oasis-promise som en trygg teknisk feil", async () => {
    mocks.validateIdportenToken.mockRejectedValueOnce(
      new Error("secret-oasis-validation-detail"),
    );

    await expect(
      validateToken("safe-idporten-token-canary"),
    ).rejects.toMatchObject({
      code: 500,
      message: "ID-porten token validation failed",
    });

    expect(mocks.warn).not.toHaveBeenCalled();
    expect(mocks.error).toHaveBeenCalledOnce();
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "idporten_token_validation_failed",
        operation: "validate_idporten_token",
        error_code: "IDPORTEN_TOKEN_VALIDATION_ERROR",
      },
      "ID-porten token validation failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toMatch(
      /safe-idporten-token-canary|secret-oasis-validation-detail/,
    );
  });
});
