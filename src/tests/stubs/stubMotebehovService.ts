import { SafeParseReturnType } from "zod";
import { createMotebehov } from "../fixtures/motebehov";
import {
  MotebehovDTO,
  motebehovSchema,
} from "@/server/service/schema/motebehovSchema";
import * as motebehovService from "@/server/service/motebehovService";

export const stubMotebehovService = (
  method: "getMotebehovSM" | "getMotebehovAG",
  response?: MotebehovDTO
): StubGetMotebehovReturnType => {
  const motebehovSpy = jest.spyOn(motebehovService, method);
  const motebehovMock =
    response ??
    createMotebehov({
      visMotebehov: true,
      skjemaType: "SVAR_BEHOV",
    });

  const mockedMotebehovResponse = Promise.resolve(
    motebehovSchema.safeParse(motebehovMock)
  );

  motebehovSpy.mockImplementation(() => mockedMotebehovResponse);

  return { motebehovSpy, motebehovMock };
};

interface StubGetMotebehovReturnType {
  motebehovSpy: jest.SpyInstance<Promise<GetMotebehovResponseType>>;
  motebehovMock: MotebehovDTO;
}

type GetMotebehovResponseType = SafeParseReturnType<MotebehovDTO, any>;
