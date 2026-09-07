import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "./tokenXExchange";

const mocks = vi.hoisted(() => ({
  requestTokenxOboToken: vi.fn(),
  error: vi.fn(),
}));

vi.mock("@navikt/oasis", () => ({
  requestTokenxOboToken: mocks.requestTokenxOboToken,
}));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error },
}));

describe("TokenX exchange observability", () => {
  beforeEach(() => {
    mocks.requestTokenxOboToken.mockReset();
    mocks.error.mockReset();
  });

  it("logger én kanonisk, PII-fri feil uten token eller bibliotekmelding", async () => {
    mocks.requestTokenxOboToken.mockResolvedValueOnce({
      ok: false,
      error: new Error("secret-oauth-provider-detail"),
    });

    const result = exchangeIdPortenTokenForTokenXOboToken(
      "safe-idporten-token-canary",
      TokenXTargetApi.ISDIALOGMOTE,
    );

    await expect(result).rejects.toMatchObject({ code: 500 });
    expect(mocks.error).toHaveBeenCalledOnce();
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "tokenx_obo_exchange_failed",
        operation: "exchange_tokenx_obo",
        error_code: "TOKENX_OBO_EXCHANGE_ERROR",
        upstream: "isdialogmote",
      },
      "TokenX OBO exchange failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toMatch(
      /safe-idporten-token-canary|secret-oauth-provider-detail/,
    );
  });

  it("klassifiserer avvist Oasis-promise som en trygg teknisk feil", async () => {
    mocks.requestTokenxOboToken.mockRejectedValueOnce(
      new Error("secret-oasis-rejection-detail"),
    );

    const result = exchangeIdPortenTokenForTokenXOboToken(
      "safe-idporten-token-canary",
      TokenXTargetApi.ISDIALOGMOTE,
    );

    await expect(result).rejects.toMatchObject({
      code: 500,
      message: "TokenX OBO exchange failed",
    });
    expect(mocks.error).toHaveBeenCalledOnce();
    expect(mocks.error).toHaveBeenCalledWith(
      {
        event_type: "tokenx_obo_exchange_failed",
        operation: "exchange_tokenx_obo",
        error_code: "TOKENX_OBO_EXCHANGE_ERROR",
        upstream: "isdialogmote",
      },
      "TokenX OBO exchange failed",
    );
    expect(JSON.stringify(mocks.error.mock.calls)).not.toMatch(
      /safe-idporten-token-canary|secret-oasis-rejection-detail/,
    );
  });
});

describe("Lumi TokenX target", () => {
  it("uses the configured Lumi audience with the existing OBO exchange", async () => {
    const previous = process.env.LUMI_API_CLIENT_ID;
    process.env.LUMI_API_CLIENT_ID = "dev-gcp:team-esyfo:lumi-api";
    mocks.requestTokenxOboToken.mockResolvedValueOnce({
      ok: true,
      token: "obo-result",
    });
    try {
      await expect(
        exchangeIdPortenTokenForTokenXOboToken(
          "idporten-token",
          TokenXTargetApi.LUMI_API,
        ),
      ).resolves.toBe("obo-result");
      expect(mocks.requestTokenxOboToken).toHaveBeenLastCalledWith(
        "idporten-token",
        "dev-gcp:team-esyfo:lumi-api",
      );
    } finally {
      if (previous === undefined) delete process.env.LUMI_API_CLIENT_ID;
      else process.env.LUMI_API_CLIENT_ID = previous;
    }
  });
});
