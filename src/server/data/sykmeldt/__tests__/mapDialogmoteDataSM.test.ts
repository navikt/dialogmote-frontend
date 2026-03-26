import { describe, expect, it } from "vitest";
import { mapDialogmoteDataSM } from "@/server/data/sykmeldt/mapDialogmoteDataSM";
import { createBrevDTO } from "../../../../mocks/data/factories/brevDTO";

describe("mapDialogmoteDataSM", () => {
  describe("moteinnkalling", () => {
    it("should return innkalling even if referat endret after", () => {
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-05",
      });
      const endretReferat = createBrevDTO({
        brevType: "REFERAT_ENDRET",
        createdAt: "2023-06-06",
      });

      const dialogmoteData = mapDialogmoteDataSM(
        {
          visMotebehov: false,
          skjemaType: "MELD_BEHOV",
          motebehov: null,
        },
        [moteInnkalling, endretReferat],
      );

      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("INNKALT");
    });

    it("should return no innkalling when latest brev is referat", () => {
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-05",
      });
      const referat = createBrevDTO({
        brevType: "REFERAT",
        createdAt: "2023-06-06",
      });

      const dialogmoteData = mapDialogmoteDataSM(
        {
          visMotebehov: false,
          skjemaType: "MELD_BEHOV",
          motebehov: null,
        },
        [moteInnkalling, referat],
      );

      expect(dialogmoteData.moteinnkalling).toBeUndefined();
    });

    it("should return innkalling when latest brev is innkalling", () => {
      const referat = createBrevDTO({
        brevType: "REFERAT",
        createdAt: "2023-06-05",
      });
      const moteInnkalling = createBrevDTO({
        brevType: "INNKALT",
        createdAt: "2023-06-06",
      });

      const dialogmoteData = mapDialogmoteDataSM(
        {
          visMotebehov: false,
          skjemaType: "MELD_BEHOV",
          motebehov: null,
        },
        [moteInnkalling, referat],
      );

      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("INNKALT");
    });

    it("should return innkalling when latest brev is endring", () => {
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

      const dialogmoteData = mapDialogmoteDataSM(
        {
          visMotebehov: false,
          skjemaType: "MELD_BEHOV",
          motebehov: null,
        },
        [referat, moteInnkalling, moteEndret],
      );

      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("NYTT_TID_STED");
    });

    it("should return innkalling when latest brev is avlysning", () => {
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

      const dialogmoteData = mapDialogmoteDataSM(
        {
          visMotebehov: false,
          skjemaType: "MELD_BEHOV",
          motebehov: null,
        },
        [referat, moteInnkalling, moteAvlyst],
      );

      expect(dialogmoteData.moteinnkalling).toBeDefined();
      expect(dialogmoteData.moteinnkalling?.brevType).toEqual("AVLYST");
    });
  });

  describe("referater", () => {
    it("should return sorted referater and exclude non-referat brev", () => {
      const referat = createBrevDTO({
        uuid: "referat",
        brevType: "REFERAT",
        createdAt: "2023-06-05",
      });
      const endretReferat = createBrevDTO({
        uuid: "endret-referat",
        brevType: "REFERAT_ENDRET",
        createdAt: "2023-06-07",
      });
      const moteInnkalling = createBrevDTO({
        uuid: "innkalling",
        brevType: "INNKALT",
        createdAt: "2023-06-06",
      });

      const dialogmoteData = mapDialogmoteDataSM(
        {
          visMotebehov: false,
          skjemaType: "MELD_BEHOV",
          motebehov: null,
        },
        [referat, moteInnkalling, endretReferat],
      );

      expect(dialogmoteData.referater).toHaveLength(2);
      expect(dialogmoteData.referater.map((item) => item.uuid)).toEqual([
        "endret-referat",
        "referat",
      ]);
    });
  });
});
