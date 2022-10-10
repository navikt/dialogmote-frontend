import { createMocks } from "node-mocks-http";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";
import { stubBrevService } from "../../../../tests/stubs/stubBrevService";
import { stubMotebehovService } from "../../../../tests/stubs/stubMotebehovService";
import { stubGetTokenX } from "../../../../tests/stubs/stubGetTokenX";
import { ID_PORTEN_TOKEN, SYKMELDT, TOKENX } from "../../../../tests/constants";

describe("Concurrent data fetch for AG", () => {
  it("should fetch both motebehov and brev for AG", async () => {
    const { req, res } = createMocks({ method: "GET" });

    req.idportenToken = ID_PORTEN_TOKEN;
    res.sykmeldt = SYKMELDT;

    const tokenXSpy = stubGetTokenX([TOKENX.motebehov, TOKENX.isdialogmote]);
    const { brevSpy, brevMock } = stubBrevService("getBrevAG");
    const { motebehovSpy, motebehovMock } =
      stubMotebehovService("getMotebehovAG");

    await fetchConcurrentDataAG(req, res, () => {});

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

    expect(brevSpy).toBeCalledWith(TOKENX.isdialogmote, res.sykmeldt.fnr);
    expect(motebehovSpy).toBeCalledWith(
      TOKENX.motebehov,
      res.sykmeldt.fnr,
      res.sykmeldt.orgnummer
    );

    expect(res.motebehov).toEqual(motebehovMock);
    expect(res.brevArray).toEqual(brevMock);
  });
});
