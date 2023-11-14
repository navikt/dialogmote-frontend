import "@testing-library/jest-dom";
import "@testing-library/user-event";
import { testServer } from "../mocks/testServer";

import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

jest.mock("@/common/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ trackEvent: jest.fn() }),
}));

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    basePath: "/basepath",
  },
}));
jest.mock("src/auth/beskyttetSide.ts", () => {
  return jest.fn().mockImplementation((callback) => {
    callback();
  });
});

beforeAll(() => testServer.listen());
afterEach(() => {
  testServer.resetHandlers();
});
afterAll(() => testServer.close());
