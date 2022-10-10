import { createMocks } from "node-mocks-http";
import { fetchConcurrentDataSM } from "@/server/data/sykmeldt/fetchConcurrentDataSM";
import { stubBrevService } from "../../../../tests/stubs/stubBrevService";
import { stubMotebehovService } from "../../../../tests/stubs/stubMotebehovService";
import { stubGetTokenX } from "../../../../tests/stubs/stubGetTokenX";
import { ID_PORTEN_TOKEN, TOKENX } from "../../../../tests/constants";

describe("concurrent data fetch for SM", () => {
  it("should fetch both motebehov and brev for SM", async () => {
    const { req, res } = createMocks({ method: "GET" });

    req.idportenToken = ID_PORTEN_TOKEN;

    const tokenXSpy = stubGetTokenX([TOKENX.motebehov, TOKENX.isdialogmote]);
    const { brevSpy, brevMock } = stubBrevService("getBrevSM");
    const { motebehovSpy, motebehovMock } =
      stubMotebehovService("getMotebehovSM");

    await fetchConcurrentDataSM(req, res, () => {});

    expect(tokenXSpy).toHaveBeenNthCalledWith(
      1,
      ID_PORTEN_TOKEN,
      process.env.SYFOMOTEBEHOV_CLIENT_ID
    );

    expect(tokenXSpy).toHaveBeenNthCalledWith(
      2,
      ID_PORTEN_TOKEN,
      process.env.ISDIALOGMOTE_CLIENT_ID
    );

    expect(motebehovSpy).toBeCalledWith(TOKENX.motebehov);
    expect(brevSpy).toBeCalledWith(TOKENX.isdialogmote);

    expect(res.motebehov).toEqual(motebehovMock);
    expect(res.brevArray).toEqual(brevMock);
  });
});
