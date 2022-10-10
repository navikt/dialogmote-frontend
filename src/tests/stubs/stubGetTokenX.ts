import * as tokenXService from "@/server/auth/tokenx";
import serverLogger from "@/server/utils/serverLogger";

export const stubGetTokenX = (
  responses: string[]
): jest.SpyInstance<Promise<string>> => {
  const tokenXSpy = jest.spyOn(tokenXService, "getTokenX");

  responses.forEach((response, idx) =>
    tokenXSpy.mockImplementationOnce(() => Promise.resolve(response))
  );

  return tokenXSpy;
};
