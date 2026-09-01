import { type InitOptions, init } from "@nais/apm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { browserApmOptions } from "@/observability/browser";
import { setCurrentBrowserPage } from "@/observability/routes";
import { DMErrorBoundary } from "./DMErrorBoundary";

vi.mock("./PageError", () => ({
  default: () => <p>Fallback</p>,
}));

const rawLetterId = "0eda3772-1cab-482e-be5f-c18387cd8709";
const normalizedPage = "/syk/dialogmoter/sykmeldt/referat/{brevuuid}";

const ThrowingChild = () => {
  throw new Error(
    `synthetic-render-canary at /syk/dialogmoter/sykmeldt/referat/${rawLetterId}?fnr=01017012345`,
  );
};

describe("DMErrorBoundary", () => {
  it("viser fallback og sender en skrubbet renderfeil nøyaktig én gang via APM", () => {
    type TransportItem = Parameters<NonNullable<InitOptions["beforeSend"]>>[0];
    const exceptions: TransportItem[] = [];
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    let faro: ReturnType<typeof init> | undefined;

    try {
      setCurrentBrowserPage("/sykmeldt/referat/[brevuuid]");
      faro = init({
        ...browserApmOptions,
        app: "dialogmote-frontend-test",
        namespace: "team-esyfo-test",
        version: "test",
        environment: "test",
        tenant: false,
        beforeSend: (item) => {
          const sanitized = browserApmOptions.beforeSend(item);
          if (sanitized?.type === "exception") exceptions.push(sanitized);
          return sanitized;
        },
        faro: {
          ...browserApmOptions.faro,
          batching: { enabled: false },
          isolate: true,
          preventGlobalExposure: true,
          sessionTracking: { enabled: false },
        },
      });

      render(
        <DMErrorBoundary>
          <ThrowingChild />
        </DMErrorBoundary>,
      );

      expect(screen.getByText("Fallback")).toBeInTheDocument();
      expect(exceptions).toHaveLength(1);
      expect(exceptions[0]).toMatchObject({
        type: "exception",
        payload: {
          value: `synthetic-render-canary at ${normalizedPage}`,
        },
      });
      expect(JSON.stringify(exceptions[0])).not.toMatch(
        /0eda3772|01017012345|fnr=/,
      );
    } finally {
      if (faro) {
        faro.instrumentations.remove(...faro.instrumentations.instrumentations);
      }
      consoleError.mockRestore();
    }
  });
});
