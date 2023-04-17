import "@testing-library/jest-dom";
import "@testing-library/user-event";
import { testServer } from "../mocks/testServer";

jest.useFakeTimers("modern");

jest.mock("@/common/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ trackEvent: jest.fn() }),
}));

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    basePath: "/basepath",
  },
}));

beforeAll(() => testServer.listen());
afterEach(() => {
  testServer.resetHandlers();
});
afterAll(() => testServer.close());
