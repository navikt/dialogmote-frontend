import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useOppfolgingsplanUrlAG } from "./useOppfolgingsplanUrlAG";

const useNarmesteLederIdMock = vi.fn();

vi.mock("@/common/hooks/useNarmesteLederId", () => ({
  useNarmesteLederId: () => useNarmesteLederIdMock(),
}));

vi.mock("@/common/publicEnv", () => ({
  nyOppfolgingsplanRoot: "https://www.nav.no/syk/oppfolgingsplan",
}));

describe("useOppfolgingsplanUrlAG", () => {
  beforeEach(() => {
    useNarmesteLederIdMock.mockReset();
  });

  it("returns root url when narmeste leder id is missing", () => {
    useNarmesteLederIdMock.mockReturnValue(undefined);

    const { result } = renderHook(() => useOppfolgingsplanUrlAG());

    expect(result.current).toBe("https://www.nav.no/syk/oppfolgingsplan");
  });

  it("returns root url with narmeste leder id from route", () => {
    useNarmesteLederIdMock.mockReturnValue(
      "12345678-1234-1234-1234-123456789012",
    );

    const { result } = renderHook(() => useOppfolgingsplanUrlAG());

    expect(result.current).toBe(
      "https://www.nav.no/syk/oppfolgingsplan/12345678-1234-1234-1234-123456789012",
    );
  });

  it("prefers narmeste leder id override over route value", () => {
    useNarmesteLederIdMock.mockReturnValue(
      "12345678-1234-1234-1234-123456789012",
    );

    const { result } = renderHook(() =>
      useOppfolgingsplanUrlAG("11111111-2222-3333-4444-555555555555"),
    );

    expect(result.current).toBe(
      "https://www.nav.no/syk/oppfolgingsplan/11111111-2222-3333-4444-555555555555",
    );
  });
});
