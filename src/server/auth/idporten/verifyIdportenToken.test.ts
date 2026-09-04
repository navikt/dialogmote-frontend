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
