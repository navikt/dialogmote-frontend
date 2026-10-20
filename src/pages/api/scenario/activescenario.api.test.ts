import type { NextApiRequest, NextApiResponse } from "next";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TEST_SESSION_ID } from "@/common/api/fetch";
import getMockDb from "@/server/data/mock/getMockDb";
import handler from "./activescenario.api";

const env = vi.hoisted(() => ({ isDemoOrLocal: true }));
vi.mock("@/common/publicEnv", () => env);

const sessionId = "active-scenario-test";
afterEach(() => {
  env.isDemoOrLocal = true;
  delete global._mockDb[sessionId];
});

const response = () => {
  const res = { status: vi.fn(), end: vi.fn(), json: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
};

describe("active scenario API", () => {
  it.each(["MOTEBEHOV_MELDT", "MOTEBEHOV_SVART_JA"])(
    "activates and returns %s in demo/local",
    (scenario) => {
      const req = {
        method: "POST",
        headers: { [TEST_SESSION_ID]: sessionId },
        body: scenario,
      } as unknown as NextApiRequest;
      const res = response();

      handler(req, res as unknown as NextApiResponse);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(getMockDb(req).activeTestScenario).toBe(scenario);
      const getRes = response();
      handler(
        { ...req, method: "GET" } as NextApiRequest,
        getRes as unknown as NextApiResponse,
      );
      expect(getRes.json).toHaveBeenCalledWith(scenario);
    },
  );

  it.each(["GET", "POST"])(
    "returns 404 outside demo/local for %s",
    (method) => {
      env.isDemoOrLocal = false;
      const res = response();

      handler(
        { method, body: "MOTEBEHOV_MELDT" } as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.end).toHaveBeenCalled();
      expect(global._mockDb[sessionId]).toBeUndefined();
    },
  );
});
