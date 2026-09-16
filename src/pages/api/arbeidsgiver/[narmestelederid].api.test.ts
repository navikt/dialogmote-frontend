import type { NextApiRequest, NextApiResponse } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import handler from "./[narmestelederid].api";

const mocks = vi.hoisted(() => ({
  fetchConcurrentDataAG: vi.fn(),
  fetchSykmeldtAG: vi.fn(),
  logMissingMoteinnkallingAG: vi.fn(),
  mapDialogmoteDataAG: vi.fn(),
}));

vi.mock("@/server/data/arbeidsgiver/fetchConcurrentDataAG", () => ({
  fetchConcurrentDataAG: mocks.fetchConcurrentDataAG,
}));
vi.mock("@/server/data/arbeidsgiver/fetchSykmeldtAG", () => ({
  fetchSykmeldtAG: mocks.fetchSykmeldtAG,
}));
vi.mock("@/server/data/arbeidsgiver/mapDialogmoteDataAG", () => ({
  mapDialogmoteDataAG: mocks.mapDialogmoteDataAG,
}));
vi.mock("@/server/utils/logMissingMoteinnkallingAG", () => ({
  logMissingMoteinnkallingAG: mocks.logMissingMoteinnkallingAG,
}));

const response = () => {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
  };
  res.status.mockReturnValue(res);
  return res;
};

describe("arbeidsgiver dialogmote API", () => {
  beforeEach(() => {
    mocks.fetchConcurrentDataAG.mockReset().mockResolvedValue({
      motebehov: {},
      brevArray: [],
    });
    mocks.fetchSykmeldtAG.mockReset().mockResolvedValue({
      fnr: "synthetic-fnr",
      orgnummer: "synthetic-orgnummer",
    });
    mocks.logMissingMoteinnkallingAG.mockReset().mockResolvedValue(undefined);
    mocks.mapDialogmoteDataAG.mockReset().mockReturnValue({});
  });

  it("passes the route narmestelederid to the employer aggregate fetch", async () => {
    const req = {
      query: { narmestelederid: "synthetic-leder-id" },
    } as unknown as NextApiRequest;
    const res = response();

    await handler(req, res as unknown as NextApiResponse);

    expect(mocks.fetchConcurrentDataAG).toHaveBeenCalledWith(
      req,
      "synthetic-fnr",
      "synthetic-orgnummer",
      "synthetic-leder-id",
    );
    expect(res.json).toHaveBeenCalledWith({});
  });
});
