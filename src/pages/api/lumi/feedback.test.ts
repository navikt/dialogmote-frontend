import type { NextApiRequest, NextApiResponse } from "next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  dialogmoteSurvey,
  dialogmoteSurveyId,
  dialogmoteSurveyRevision,
} from "@/common/components/lumi/dialogmoteSurvey";
import { HttpError } from "@/common/utils/errors/HttpError";
import configHandler from "./config.api";
import handler, { config } from "./feedback.api";

const mocks = vi.hoisted(() => ({
  post: vi.fn(),
  environment: {
    LUMI_API_HOST: "http://lumi-api.team-esyfo",
    LUMI_API_CLIENT_ID: "dev-gcp:team-esyfo:lumi-api",
  },
  mockBackend: false,
}));
vi.mock("@/server/tokenXFetch/tokenXFetchPost", () => ({
  tokenXFetchPost: mocks.post,
}));
vi.mock("@/server/utils/serverEnv", () => ({
  default: mocks.environment,
  get isMockBackend() {
    return mocks.mockBackend;
  },
}));

function response() {
  const result = {
    setHeader: vi.fn(),
    status: vi.fn(),
    json: vi.fn(),
    end: vi.fn(),
  };
  result.status.mockReturnValue(result);
  return result;
}
function payload() {
  return {
    schemaVersion: 2,
    surveyId: dialogmoteSurveyId,
    surveyType: dialogmoteSurvey.type ?? "custom",
    submittedAt: "2026-09-07T12:00:00.000Z",
    deduplicationKey: "one-submission",
    definition: {
      surveyType: dialogmoteSurvey.type ?? "custom",
      fields: [{ fieldId: "experience", fieldType: "TEXT" }],
    },
    flow: {
      schemaVersion: 1,
      evaluatorVersion: "visible-if-v1",
      fields: [{ fieldId: "experience" }],
    },
    answers: [
      {
        fieldId: "experience",
        fieldType: "TEXT",
        question: { label: "Erfaring" },
        value: { type: "text", text: "Nyttig møte" },
      },
    ],
    context: {
      deviceType: "desktop",
      url: "https://nav.no/person/private-id",
      pathname: "/person/private-id",
      debug: { name: "Private Person" },
      tags: { fnr: "private-fnr", role: "spoofed" },
    },
  };
}

describe("Lumi feedback API", () => {
  beforeEach(() => {
    mocks.post.mockReset().mockResolvedValue(undefined);
    mocks.mockBackend = false;
    vi.stubEnv("LUMI_SURVEY_ENABLED", "true");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("checks the runtime launch switch both for discovery and direct submission", async () => {
    vi.stubEnv("LUMI_SURVEY_ENABLED", "false");
    const discovery = response();
    configHandler(
      { method: "GET" } as NextApiRequest,
      discovery as unknown as NextApiResponse,
    );
    expect(discovery.json).toHaveBeenCalledWith({ enabled: false });
    expect(discovery.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "no-store",
    );
    const res = response();
    await handler(
      { method: "POST", body: payload() } as NextApiRequest,
      res as unknown as NextApiResponse,
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(mocks.post).not.toHaveBeenCalled();
  });

  it("rejects unsupported methods and invalid or unrelated surveys before forwarding", async () => {
    const wrongMethod = response();
    await handler(
      { method: "GET" } as NextApiRequest,
      wrongMethod as unknown as NextApiResponse,
    );
    expect(wrongMethod.status).toHaveBeenCalledWith(405);
    expect(wrongMethod.setHeader).toHaveBeenCalledWith("Allow", "POST");
    for (const body of [
      null,
      { ...payload(), surveyId: "another-survey" },
      { ...payload(), answers: [] },
    ]) {
      const res = response();
      await handler(
        { method: "POST", body } as NextApiRequest,
        res as unknown as NextApiResponse,
      );
      expect(res.status).toHaveBeenCalledWith(400);
    }
    expect(mocks.post).not.toHaveBeenCalled();
    expect(config.api.bodyParser.sizeLimit).toBe("64kb");
  });

  it("forwards the V2 flow with the existing TokenX helper and removes identifying context", async () => {
    const res = response();
    const req = { method: "POST", body: payload() } as NextApiRequest;
    await handler(req, res as unknown as NextApiResponse);
    expect(mocks.post).toHaveBeenCalledWith({
      req,
      targetApi: "LUMI_API",
      operation: "lumi_feedback_submit",
      endpoint: "http://lumi-api.team-esyfo/api/tokenx/v1/feedback",
      data: {
        ...payload(),
        context: {
          deviceType: "desktop",
          tags: {
            role: "employer",
            page: "dialogmoter",
            revision: String(dialogmoteSurveyRevision),
          },
        },
      },
    });
    expect(JSON.stringify(mocks.post.mock.calls[0][0].data)).not.toMatch(
      /private-id|private-fnr|Private Person/,
    );
    expect(res.status).toHaveBeenCalledWith(204);
  });

  it("never sends local/demo answers to Lumi or exchanges tokens", async () => {
    mocks.mockBackend = true;
    const res = response();
    await handler(
      { method: "POST", body: payload() } as NextApiRequest,
      res as unknown as NextApiResponse,
    );
    expect(res.status).toHaveBeenCalledWith(204);
    expect(mocks.post).not.toHaveBeenCalled();
  });

  it.each([401, 409, 429, 500])(
    "returns safe retry/auth status for upstream %s without exposing response details",
    async (status) => {
      mocks.post.mockRejectedValueOnce(
        new HttpError(status, "private-upstream-response"),
      );
      const res = response();
      await handler(
        { method: "POST", body: payload() } as NextApiRequest,
        res as unknown as NextApiResponse,
      );
      expect(res.status).toHaveBeenCalledWith(status < 500 ? status : 502);
      expect(JSON.stringify(res.json.mock.calls)).not.toContain(
        "private-upstream-response",
      );
    },
  );
});
