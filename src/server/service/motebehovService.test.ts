import type { NextApiRequest } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { getMotebehovAG } from "./motebehovService";
import { motebehovStatusSchema } from "./schema/motebehovSchema";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock("@/server/tokenXFetch/tokenXFetchGet", () => ({
  tokenXFetchGet: mocks.get,
}));
vi.mock("@/server/tokenXFetch/tokenXFetchPost", () => ({
  tokenXFetchPost: mocks.post,
}));

vi.mock("@/server/utils/serverEnv", () => ({
  default: {
    SYFOMOTEBEHOV_HOST: "https://syfomotebehov.invalid",
  },
}));

describe("getMotebehovAG", () => {
  beforeEach(() => {
    mocks.get.mockReset().mockResolvedValue(undefined);
    mocks.post.mockReset().mockResolvedValue(undefined);
  });

  it("gets status using only narmesteLederId in the path", async () => {
    const req = {} as NextApiRequest;

    await getMotebehovAG(req, "00000000-0000-4000-8000-000000000000");

    expect(mocks.get).toHaveBeenCalledWith({
      req,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      operation: RuntimeOperation.MOTEBEHOV_FETCH,
      endpoint:
        "https://syfomotebehov.invalid/syfomotebehov/api/v5/arbeidsgiver/motebehov/00000000-0000-4000-8000-000000000000",
      responseDataSchema: motebehovStatusSchema,
    });
    expect(mocks.post).not.toHaveBeenCalled();

    const args = mocks.get.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(args).not.toHaveProperty("data");
    expect(args).not.toHaveProperty("personIdent");
    expect(args).not.toHaveProperty("orgnummer");
    expect(JSON.stringify(mocks.get.mock.calls)).not.toContain("fnr");
    expect(JSON.stringify(mocks.get.mock.calls)).not.toContain("orgnummer");
  });
});
