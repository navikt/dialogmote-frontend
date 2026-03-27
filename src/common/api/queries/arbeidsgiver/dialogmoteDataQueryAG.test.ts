import { useQuery } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HttpError } from "@/common/utils/errors/HttpError";
import { useDialogmoteDataAG } from "./dialogmoteDataQueryAG";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("@/common/hooks/routeHooks", () => ({
  useApiBasePath: () => "/api/arbeidsgiver",
}));

vi.mock("@/common/hooks/useNarmesteLederId", () => ({
  useNarmesteLederId: () => "123",
}));

describe("useDialogmoteDataAG", () => {
  const mockedUseQuery = vi.mocked(useQuery);

  beforeEach(() => {
    mockedUseQuery.mockReturnValue({} as ReturnType<typeof useQuery>);
  });

  it("should skip retry for sykmeldt 404 and keep default retries for other errors", () => {
    useDialogmoteDataAG();

    const options = mockedUseQuery.mock.calls[0][0];

    expect(options.retry?.(0, new HttpError(404, "SYKMELDT_NOT_FOUND"))).toBe(
      false,
    );
    expect(options.retry?.(2, new HttpError(500, "INTERNAL_SERVER_ERROR"))).toBe(
      true,
    );
    expect(options.retry?.(3, new HttpError(500, "INTERNAL_SERVER_ERROR"))).toBe(
      false,
    );
  });
});
