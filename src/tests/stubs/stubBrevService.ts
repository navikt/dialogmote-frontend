import { array, SafeParseReturnType, ZodObject } from "zod";
import { createInnkallelseBrev } from "../fixtures/brev";
import * as brevService from "@/server/service/brevService";
import { BrevDTO, brevSchema } from "@/server/service/schema/brevSchema";
import { Brev } from "../../types/shared/brev";

export const stubBrevService = (
  method: "getBrevSM" | "getBrevAG",
  response?: BrevDTO[]
): StubGetBrevReturnType => {
  const brevSpy = jest.spyOn(brevService, method);
  const brevMock = response ?? [createInnkallelseBrev()];

  const mockedBrevResponse = Promise.resolve(
    array(brevSchema).safeParse(brevMock)
  );

  brevSpy.mockImplementation(() => mockedBrevResponse);

  return { brevSpy, brevMock };
};

interface StubGetBrevReturnType {
  brevSpy: jest.SpyInstance<Promise<GetBrevResponseType>>;
  brevMock: Brev[];
}

type GetBrevResponseType = SafeParseReturnType<BrevDTO[], any>;
