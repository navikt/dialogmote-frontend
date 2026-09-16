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

  it("sends only narmesteLederId in a POST body", async () => {
    const req = {} as NextApiRequest;

    await getMotebehovAG(req, "synthetic-leder-id");

    expect(mocks.post).toHaveBeenCalledWith({
      req,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      operation: RuntimeOperation.MOTEBEHOV_FETCH,
      endpoint:
        "https://syfomotebehov.invalid/syfomotebehov/api/v5/arbeidsgiver/motebehov/status",
      data: { narmesteLederId: "synthetic-leder-id" },
      responseDataSchema: motebehovStatusSchema,
    });
    expect(JSON.stringify(mocks.post.mock.calls)).not.toContain("fnr");
    expect(JSON.stringify(mocks.post.mock.calls)).not.toContain("orgnummer");
  });
});
