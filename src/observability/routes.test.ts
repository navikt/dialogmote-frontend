import { afterEach, describe, expect, it, vi } from "vitest";

const originalUrl = window.location.href;

describe("initial browser page identity", () => {
  afterEach(() => {
    window.history.replaceState({}, "", originalUrl);
    vi.resetModules();
  });

  it("er normalisert fra location før React hydration", async () => {
    window.history.replaceState(
      {},
      "",
      "/syk/dialogmoter/arbeidsgiver/leader-ref/referat/letter-ref?canary=hidden",
    );
    vi.resetModules();

    const { getCurrentBrowserPage } = await import("./routes");

    expect(getCurrentBrowserPage()).toBe(
      "/syk/dialogmoter/arbeidsgiver/{narmestelederid}/referat/{brevuuid}",
    );
  });
});
