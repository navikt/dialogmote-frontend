import "@testing-library/user-event";
import "vitest-canvas-mock";

import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import * as vitestAxeMatchers from "vitest-axe/matchers";
import { cleanup } from "@testing-library/react";

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
vi.mock("src/auth/beskyttetSide.ts", () => {
  return vi.fn().mockImplementation((callback) => {
    callback();
  });
});

beforeAll(() => testServer.listen());
afterEach(() => {
  cleanup();
  testServer.resetHandlers();
});
afterAll(() => testServer.close());
