import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  FetchNetworkError,
  FetchResponseParseError,
} from "@/common/api/fetch/errors";
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

  it.each([
    [new FetchNetworkError("Network request failed"), "network"],
    [
      new FetchResponseParseError("Response parsing failed", "invalid_json"),
      "invalid_json",
    ],
    [
      new FetchResponseParseError("Response parsing failed", "body_read"),
      "body_read",
    ],
  ])("sender lukket failure_reason for fetch-feil", (error, failureReason) => {
    reportBrowserMutationError(error);

    expect(captureException).toHaveBeenCalledOnce();
    expect(captureException).toHaveBeenCalledWith(error, {
      context: { failure_reason: failureReason },
    });
  });

  it("sender ikke forventet AbortError fra mutation", () => {
    reportBrowserMutationError(
      new DOMException("Avbrutt for ola-nordmann 01017012345", "AbortError"),
    );

    expect(captureException).not.toHaveBeenCalled();
  });

  it("sender aldri en ukjent failure_reason", () => {
    const error = Object.assign(
      new FetchResponseParseError("Response parsing failed", "invalid_json"),
      { failureReason: "ola-nordmann 01017012345" },
    );

    reportBrowserMutationError(error);

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
