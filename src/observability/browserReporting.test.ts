import { beforeEach, describe, expect, it, vi } from "vitest";
import { HttpError } from "@/common/utils/errors/HttpError";

const { captureException, init, isInitialized, isLocalHost, pushEvent } =
  vi.hoisted(() => ({
    captureException: vi.fn(),
    init: vi.fn(),
    isInitialized: vi.fn(() => true),
    isLocalHost: vi.fn(() => true),
    pushEvent: vi.fn(),
  }));

vi.mock("@nais/apm", () => ({
  captureException,
  init,
  isInitialized,
  isLocalHost,
  pushEvent,
  scrubString: (value: string) => value,
}));

import {
  initBrowserObservability,
  reportBrowserMutationError,
  trackBrowserRoute,
} from "./browser";

describe("browser reporting ownership", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isInitialized.mockReturnValue(true);
  });

  it("sender en håndtert mutation-feil én gang", () => {
    const error = new Error("Request failed");

    reportBrowserMutationError(error);

    expect(captureException).toHaveBeenCalledOnce();
    expect(captureException).toHaveBeenCalledWith(error);
  });

  it("sender ikke forventet 401 fra mutation", () => {
    reportBrowserMutationError(new HttpError(401, "Unauthorized"));

    expect(captureException).not.toHaveBeenCalled();
  });

  it("sender ingenting før APM er initialisert", () => {
    isInitialized.mockReturnValue(false);

    reportBrowserMutationError(new Error("Request failed"));
    trackBrowserRoute("/syk/dialogmoter/sykmeldt");

    expect(captureException).not.toHaveBeenCalled();
    expect(pushEvent).not.toHaveBeenCalled();
  });

  it("sender kanoniske ruter", () => {
    trackBrowserRoute(
      "/syk/dialogmoter/arbeidsgiver/{narmestelederid}/referat/{brevuuid}",
      "/syk/dialogmoter/sykmeldt",
    );

    expect(pushEvent).toHaveBeenCalledWith("route_change", {
      toRoute:
        "/syk/dialogmoter/arbeidsgiver/{narmestelederid}/referat/{brevuuid}",
      toUrl:
        "/syk/dialogmoter/arbeidsgiver/{narmestelederid}/referat/{brevuuid}",
      fromRoute: "/syk/dialogmoter/sykmeldt",
      fromUrl: "/syk/dialogmoter/sykmeldt",
    });
  });

  it("initialiserer ikke collector på localhost", () => {
    expect(location.hostname).toBe("localhost");

    expect(initBrowserObservability()).toBeUndefined();
    expect(init).not.toHaveBeenCalled();
  });
});
