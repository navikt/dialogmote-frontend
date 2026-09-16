import type { NextApiRequest } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { getMotebehovAG } from "./motebehovService";
import { motebehovStatusSchema } from "./schema/motebehovSchema";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/server/tokenXFetch/tokenXFetchGet", () => ({
  tokenXFetchGet: mocks.get,
}));

vi.mock("@/server/utils/serverEnv", () => ({
  default: {
    SYFOMOTEBEHOV_HOST: "https://syfomotebehov.invalid",
  },
}));

describe("getMotebehovAG", () => {
  beforeEach(() => {
    mocks.get.mockReset().mockResolvedValue(undefined);
  });

  it("includes narmesteLederId in the syfomotebehov query", async () => {
    const req = {} as NextApiRequest;

    await getMotebehovAG(
      req,
      "synthetic-fnr",
      "synthetic-orgnummer",
      "synthetic-leder-id",
    );

    expect(mocks.get).toHaveBeenCalledWith({
      req,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      operation: RuntimeOperation.MOTEBEHOV_FETCH,
      endpoint:
        "https://syfomotebehov.invalid/syfomotebehov/api/v4/motebehov?fnr=synthetic-fnr&virksomhetsnummer=synthetic-orgnummer&narmesteLederId=synthetic-leder-id",
      responseDataSchema: motebehovStatusSchema,
    });
  });
});
