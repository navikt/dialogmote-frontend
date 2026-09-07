// @vitest-environment node
import type { IncomingMessage } from "node:http";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { validateAndGetIdportenToken } from "./idporten/idportenToken";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "./tokenXExchange";

const logs = vi.hoisted(() => ({ error: vi.fn(), warn: vi.fn() }));
vi.mock("@navikt/next-logger", () => ({ logger: logs }));

// Use the real Oasis client: it catches fetch failures and returns ok: false.
const token = `${[
  { alg: "RS256", kid: "test-key" },
  { exp: Math.floor(Date.now() / 1000) + 600 },
]
  .map((part) => Buffer.from(JSON.stringify(part)).toString("base64url"))
  .join(".")}.c2lnbmF0dXJl`;

function requestWithToken(value: string): IncomingMessage {
  return { headers: { authorization: `Bearer ${value}` } } as IncomingMessage;
}

describe("auth failures through Oasis", () => {
  beforeEach(() => {
    vi.stubEnv("MOCK_BACKEND", "false");
    vi.stubEnv(
      "NAIS_TOKEN_EXCHANGE_ENDPOINT",
      "https://texas.example.test/exchange",
    );
    vi.stubEnv("NAIS_TOKEN_ENDPOINT", "https://texas.example.test/token");
    vi.stubEnv(
      "NAIS_TOKEN_INTROSPECTION_ENDPOINT",
      "https://texas.example.test/introspect",
    );
    vi.stubEnv("IDPORTEN_JWKS_URI", "https://idporten.example.test/jwks");
    vi.stubEnv("IDPORTEN_ISSUER", "https://idporten.example.test");
    vi.stubEnv("IDPORTEN_AUDIENCE", "test-client");
    vi.stubEnv("ISDIALOGMOTE_CLIENT_ID", "test-target");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it.each(["network", "http"])(
    "treats TokenX %s failure as a technical error",
    async (failure) => {
      const fetch = vi.fn();
      if (failure === "network") {
        fetch.mockRejectedValue(new TypeError("private network detail"));
      } else {
        fetch.mockResolvedValue(
          new Response("private upstream body", { status: 503 }),
        );
      }
      vi.stubGlobal("fetch", fetch);

      await expect(
        exchangeIdPortenTokenForTokenXOboToken(
          token,
          TokenXTargetApi.ISDIALOGMOTE,
        ),
      ).rejects.toMatchObject({ code: 500 });
      expect(fetch).toHaveBeenCalledOnce();
      expect(logs.error).toHaveBeenCalledExactlyOnceWith(
        {
          event_type: "tokenx_obo_exchange_failed",
          operation: "exchange_tokenx_obo",
          error_code: "TOKENX_OBO_EXCHANGE_ERROR",
          upstream: "isdialogmote",
        },
        "TokenX OBO exchange failed",
      );
      expect(JSON.stringify(logs.error.mock.calls)).not.toMatch(
        /private|c2lnbmF0dXJl/,
      );
    },
  );

  it("treats failure to fetch ID-porten signing keys as a technical error", async () => {
    const fetch = vi
      .fn()
      .mockRejectedValue(new TypeError("private JWKS detail"));
    vi.stubGlobal("fetch", fetch);

    await expect(
      validateAndGetIdportenToken(requestWithToken(token)),
    ).rejects.toMatchObject({ code: 500 });
    expect(fetch).toHaveBeenCalledOnce();
    expect(logs.error).toHaveBeenCalledExactlyOnceWith(
      {
        event_type: "idporten_token_validation_failed",
        operation: "validate_idporten_token",
        error_code: "IDPORTEN_TOKEN_VALIDATION_ERROR",
      },
      "ID-porten token validation failed",
    );
    expect(JSON.stringify(logs.error.mock.calls)).not.toMatch(
      /private|c2lnbmF0dXJl/,
    );
  });

  it("keeps malformed tokens as an authentication failure", async () => {
    await expect(
      validateAndGetIdportenToken(requestWithToken("invalid-token")),
    ).rejects.toMatchObject({ code: 401 });
    expect(logs.error).toHaveBeenCalledExactlyOnceWith(
      {
        event_type: "idporten_token_validation_failed",
        operation: "validate_idporten_token",
        error_code: "IDPORTEN_TOKEN_VALIDATION_FAILED",
      },
      "ID-porten token validation failed",
    );
  });
});
