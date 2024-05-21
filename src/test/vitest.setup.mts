import "@testing-library/user-event";
import "vitest-canvas-mock";

import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import * as vitestAxeMatchers from "vitest-axe/matchers";

import { testServer } from "../mocks/testServer";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);
expect.extend(vitestAxeMatchers);

vi.mock("@/common/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ trackEvent: vi.fn() }),
}));

vi.mock("next/router", () => require("next-router-mock"));
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
