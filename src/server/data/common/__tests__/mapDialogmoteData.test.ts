import { createMotebehov } from "../../../../tests/fixtures/motebehov";
import { createInnkallelseBrev } from "../../../../tests/fixtures/brev";
import { createSykmeldt } from "../../../../tests/fixtures/sykmeldt";
import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";
import { BrevType } from "../../../../types/client/brev";

describe("Data mapper for dialogmote", () => {
  it("should map referat correctly", () => {
    const motebehov = createMotebehov();
    const sykmeldt = createSykmeldt();

    const brevTypeToTest: Array<BrevType> = ["REFERAT", "REFERAT_ENDRET"];

    brevTypeToTest.forEach((brevType) => {
      const brevList = [createInnkallelseBrev({ brevType: brevType })];

      const mappedDialogmote = mapDialogmoteData(motebehov, brevList, sykmeldt);

      expect(mappedDialogmote).toEqual(
        expect.objectContaining({
          moteinnkalling: undefined,
          sykmeldt: sykmeldt,
        })
      );
    });
  });

  it("should map moteinnkalling correctly", () => {
    const motebehov = createMotebehov();
    const sykmeldt = createSykmeldt();

    const brevTypeToTest: Array<BrevType> = ["INNKALT", "NYTT_TID_STED"];

    brevTypeToTest.forEach((brevType) => {
      const brevList = [createInnkallelseBrev({ brevType: brevType })];

      const mappedDialogmote = mapDialogmoteData(motebehov, brevList, sykmeldt);

      expect(mappedDialogmote).toEqual(
        expect.objectContaining({
          moteinnkalling: brevList[0],
          sykmeldt: sykmeldt,
        })
      );
    });
  });
});
