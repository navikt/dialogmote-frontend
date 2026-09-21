import { inspect } from "node:util";
import type { NextApiRequest, NextApiResponse } from "next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { get } from "@/common/api/fetch";
import { HttpError } from "@/common/utils/errors/HttpError";
import arbeidsgiverHandler from "@/pages/api/arbeidsgiver/[narmestelederid].api";
import markReadHandler from "@/pages/api/sykmeldt/brev/[uuid]/lest.api";
import sykmeldtHandler from "@/pages/api/sykmeldt/index.api";
import {
  exchangeIdPortenTokenForTokenXOboToken,
  TokenXTargetApi,
} from "@/server/auth/tokenXExchange";
import { withUpstreamErrorResponse } from "./withUpstreamErrorResponse";

const mocks = vi.hoisted(() => ({
  lines: [] as string[],
  exchange: vi.fn(),
  validate: vi.fn(),
}));
vi.mock("@navikt/next-logger", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@navikt/next-logger")>();
  return {
    ...actual,
    logger: actual.backendLogger(
      {},
      { write: (line: string) => mocks.lines.push(line) },
    ),
  };
});
vi.mock("@navikt/oasis", () => ({ requestTokenxOboToken: mocks.exchange }));
vi.mock("@/server/auth/idporten/idportenToken", () => ({
  validateAndGetIdportenToken: mocks.validate,
}));
vi.mock("@/server/utils/serverEnv", () => ({
  isMockBackend: false,
  default: {
    DINESYKMELDTE_BACKEND_HOST: "/dinesykmeldte",
    SYFOMOTEBEHOV_HOST: "/syfomotebehov",
    ISDIALOGMOTE_HOST: "/isdialogmote",
  },
}));
vi.mock("@/common/publicEnv", () => ({ isLocal: false, isDemoOrLocal: false }));

const req = {
  query: {
    narmestelederid: "c8673d2a-a550-42b2-a22d-123456789012",
    uuid: "c8673d2a-a550-42b2-a22d-123456789012",
  },
} as unknown as NextApiRequest;
const response = () => {
  const res = { status: vi.fn(), end: vi.fn(), json: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
};
const secretCause = () =>
  Object.assign(new Error("secret-provider-token-canary"), {
    code: "ENOTFOUND",
    config: { headers: { Authorization: "secret-bearer-canary" } },
  });
const expectSafeFailure = (
  res: ReturnType<typeof response>,
  event: string,
  kind: string,
) => {
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.end).toHaveBeenCalledWith("Internal Server Error");
  expect(mocks.lines).toHaveLength(1);
  expect(JSON.parse(mocks.lines[0])).toMatchObject({
    event_type: event,
    failure_kind: kind,
  });
  expect(mocks.lines.join()).not.toContain("secret-");
  expect(inspect(res.end.mock.calls)).not.toContain("secret-");
};

describe("upstream failures at the actual Pages API boundary", () => {
  beforeEach(() => {
    mocks.lines.length = 0;
    mocks.exchange
      .mockReset()
      .mockResolvedValue({ ok: true, token: "secret-obo-token" });
    mocks.validate.mockReset().mockResolvedValue("secret-idporten-token");
  });
  afterEach(() => vi.unstubAllGlobals());

  it("consumes an AG network failure after one safe diagnostic, without escaping to Next", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValue(
          new TypeError("secret-url", { cause: secretCause() }),
        ),
    );
    const res = response();
    await arbeidsgiverHandler(req, res as unknown as NextApiResponse);
    expectSafeFailure(res, "dialogmote_sykmeldt_fetch_failed", "dns");
  });

  it("consumes JSON parse errors containing response content", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(new Response('{"secret-person-canary": broken}')),
    );
    const res = response();
    await arbeidsgiverHandler(req, res as unknown as NextApiResponse);
    expectSafeFailure(
      res,
      "dialogmote_sykmeldt_fetch_failed",
      "invalid_response",
    );
  });

  it("consumes token errors before fetch, preserving one token-exchange diagnostic", async () => {
    mocks.exchange.mockRejectedValue(secretCause());
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const res = response();
    await arbeidsgiverHandler(req, res as unknown as NextApiResponse);
    expectSafeFailure(res, "tokenx_obo_exchange_failed", "dns");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not let raw Oasis error data leave the token client", async () => {
    mocks.exchange.mockResolvedValue({ ok: false, error: secretCause() });
    const error = await exchangeIdPortenTokenForTokenXOboToken(
      "secret-token",
      TokenXTargetApi.ISDIALOGMOTE,
    ).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(HttpError);
    expect(error).not.toHaveProperty("cause");
    expect(inspect(error, { depth: 10 })).not.toContain("secret-");
  });

  it("consumes one failed concurrent SM request without a second terminal event", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockImplementation((url: string) =>
          url.includes("syfomotebehov")
            ? Promise.reject(secretCause())
            : Promise.resolve(Response.json([])),
        ),
    );
    const res = response();
    await sykmeldtHandler(req, res as unknown as NextApiResponse);
    expectSafeFailure(res, "dialogmote_motebehov_fetch_failed", "dns");
  });

  it("consumes an actual POST failure at the same boundary", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(secretCause()));
    const res = response();
    await markReadHandler(req, res as unknown as NextApiResponse);
    expectSafeFailure(res, "dialogmote_brev_mark_read_failed", "dns");
  });

  it("keeps authentication rejection behavior outside the upstream boundary", async () => {
    const error = new HttpError(401, "Login required");
    mocks.validate.mockRejectedValue(error);
    const res = response();
    await expect(
      arbeidsgiverHandler(req, res as unknown as NextApiResponse),
    ).rejects.toBe(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(mocks.lines).toHaveLength(0);
  });

  it("does not hide unexpected application exceptions", async () => {
    const error = new Error("application bug");
    const handler = withUpstreamErrorResponse(async () => {
      throw error;
    });
    await expect(
      handler(req, response() as unknown as NextApiResponse),
    ).rejects.toBe(error);
  });

  it("preserves cancellation while reading a 404 response body", async () => {
    const error = new DOMException("Cancelled", "AbortError");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: vi.fn().mockRejectedValue(error),
      }),
    );
    await expect(get("/api/relation")).rejects.toBe(error);
    expect(mocks.lines).toHaveLength(0);
  });
});
