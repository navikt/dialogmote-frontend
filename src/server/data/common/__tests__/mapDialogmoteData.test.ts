import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";
import { createBrevDTO } from "../../../../mocks/data/factories/brevDTO";

describe("mapDialogmoteData", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-02-02").getTime());
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe("moteInnkalling", () => {
    test("should return innkalling even if referat endret after", () => {
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-05",
      });
      const endretReferat = createBrevDTO({
        brevType: "REFERAT_ENDRET",
        createdAt: "2023-06-06",
      });

      const dialogmoteData = mapDialogmoteData(
        {
          visMotebehov: false,
          skjemaType: null,
          motebehov: null,
        },
        [moteInnkalling, endretReferat]
      );
      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("INNKALT");
    });

    test("should return no innkalling when latest brev is referat", () => {
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-05",
      });
      const referat = createBrevDTO({
        brevType: "REFERAT",
        createdAt: "2023-06-06",
      });

      const dialogmoteData = mapDialogmoteData(
        {
          visMotebehov: false,
          skjemaType: null,
          motebehov: null,
        },
        [moteInnkalling, referat]
      );
      expect(dialogmoteData.moteinnkalling).toBeUndefined();
    });

    test("should return innkalling when latest brev is innkalling", () => {
      const referat = createBrevDTO({
        brevType: "REFERAT",
        createdAt: "2023-06-05",
      });
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-06",
      });

      const dialogmoteData = mapDialogmoteData(
        {
          visMotebehov: false,
          skjemaType: null,
          motebehov: null,
        },
        [moteInnkalling, referat]
      );
      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("INNKALT");
    });

    test("should return innkalling when latest brev is endring", () => {
      const referat = createBrevDTO({
        brevType: "REFERAT",
        createdAt: "2023-06-05",
      });
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-06",
      });
      const moteEndret = createBrevDTO({
        brevType: "NYTT_TID_STED",
        createdAt: "2023-06-07",
      });
      const dialogmoteData = mapDialogmoteData(
        {
          visMotebehov: false,
          skjemaType: null,
          motebehov: null,
        },
        [referat, moteInnkalling, moteEndret]
      );
      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("NYTT_TID_STED");
    });

    test("should return innkalling when latest brev is avlysning", () => {
      const referat = createBrevDTO({
        brevType: "REFERAT",
        createdAt: "2023-06-05",
      });
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-06",
      });
      const moteAvlyst = createBrevDTO({
        brevType: "AVLYST",
        createdAt: "2023-06-07",
      });
      const dialogmoteData = mapDialogmoteData(
        {
          visMotebehov: false,
          skjemaType: null,
          motebehov: null,
        },
        [referat, moteInnkalling, moteAvlyst]
      );
      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("AVLYST");
    });
  });
});
