import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from 'util'
import serverLogger from "./src/server/utils/serverLogger";

process.env.SYFOMOTEBEHOV_CLIENT_ID = 'SYFOMOTEBEHOV_TEST_CLIENT_ID';
process.env.ISDIALOGMOTE_CLIENT_ID = 'ISDIALOGMOTE_TEST_CLIENT_ID';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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

jest.mock("@/common/publicEnv", () => ({
  isMockBackend: false
}))

const serverLoggerSpy = jest.spyOn(serverLogger, "info");
serverLoggerSpy.mockImplementation(() => {});
