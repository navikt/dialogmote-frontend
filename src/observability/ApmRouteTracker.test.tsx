import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApmRouteTracker } from "./ApmRouteTracker";

const { router, trackBrowserRoute } = vi.hoisted(() => ({
  router: {
    pathname: "/arbeidsgiver/[narmestelederid]/referat/[brevuuid]",
  },
  trackBrowserRoute: vi.fn(),
}));

vi.mock("next/router", () => ({ useRouter: () => router }));
vi.mock("./browser", () => ({ trackBrowserRoute }));

describe("ApmRouteTracker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    router.pathname = "/arbeidsgiver/[narmestelederid]/referat/[brevuuid]";
  });

  it("sender bare allowlistede Next-ruter", () => {
    const view = render(<ApmRouteTracker />);
    view.rerender(<ApmRouteTracker />);

    router.pathname = "/sykmeldt/referat/[brevuuid]";
    view.rerender(<ApmRouteTracker />);

    expect(trackBrowserRoute).toHaveBeenNthCalledWith(
      1,
      "/syk/dialogmoter/arbeidsgiver/{narmestelederid}/referat/{brevuuid}",
      undefined,
    );
    expect(trackBrowserRoute).toHaveBeenNthCalledWith(
      2,
      "/syk/dialogmoter/sykmeldt/referat/{brevuuid}",
      "/syk/dialogmoter/arbeidsgiver/{narmestelederid}/referat/{brevuuid}",
    );
    expect(trackBrowserRoute).toHaveBeenCalledTimes(2);
  });
});
