/* eslint-disable testing-library/no-manual-cleanup */
import "@testing-library/user-event";
import "vitest-canvas-mock";

import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import * as vitestAxeMatchers from "vitest-axe/matchers";

import { testServer } from "../mocks/testServer";

expect.extend(matchers);
expect.extend(vitestAxeMatchers);

vi.mock("@/common/hooks/useAnalytics", () => ({
  useAnalytics: () => ({ trackEvent: vi.fn() }),
}));

vi.mock("next/router", async () => await import("next-router-mock"));
vi.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    basePath: "/basepath",
  },
}));
beforeAll(() => testServer.listen());
afterEach(() => {
  cleanup();
  testServer.resetHandlers();
});
afterAll(() => testServer.close());
