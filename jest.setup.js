import "@testing-library/jest-dom/extend-expect";

jest.useFakeTimers("modern");

jest.mock("@/common/api/queries/brevQueries");
jest.mock("@/common/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ trackEvent: jest.fn() }),
}));

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    basePath: "/basepath",
  },
}));
