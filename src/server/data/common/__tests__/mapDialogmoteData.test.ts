import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";
import { createBrevDTO } from "../../../../mocks/data/factories/brevDTO";

const baseSykmeldt = {
  narmestelederId: "some-id",
  orgnummer: "123456789",
  fnr: "12345678901",
  navn: "Test Testesen",
  aktivSykmelding: true,
};

const motebehovWithVisMotebehov = {
  visMotebehov: true,
  skjemaType: "MELD_BEHOV" as const,
  motebehov: null,
};

describe("mapDialogmoteData", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-02-02").getTime());
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  describe("moteInnkalling", () => {
    it("should return innkalling even if referat endret after", () => {
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

      const dialogmoteData = mapDialogmoteData(
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

      const dialogmoteData = mapDialogmoteData(
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
      const dialogmoteData = mapDialogmoteData(
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
      const dialogmoteData = mapDialogmoteData(
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

  describe("motebehov", () => {
    it("should return undefined motebehov when sykmeldt has inactive sykmelding", () => {
      const dialogmoteData = mapDialogmoteData(motebehovWithVisMotebehov, [], {
        ...baseSykmeldt,
        aktivSykmelding: false,
      });

      expect(dialogmoteData.motebehov).toBeUndefined();
    });

    it("should return motebehov when sykmeldt has active sykmelding", () => {
      const dialogmoteData = mapDialogmoteData(
        motebehovWithVisMotebehov,
        [],
        baseSykmeldt,
      );

      expect(dialogmoteData.motebehov).toBeDefined();
    });

    it("should return motebehov when sykmeldt has unknown sykmelding status", () => {
      const dialogmoteData = mapDialogmoteData(motebehovWithVisMotebehov, [], {
        ...baseSykmeldt,
        aktivSykmelding: null,
      });

      expect(dialogmoteData.motebehov).toBeDefined();
    });

    it("should return motebehov when sykmeldt is undefined", () => {
      const dialogmoteData = mapDialogmoteData(motebehovWithVisMotebehov, []);

      expect(dialogmoteData.motebehov).toBeDefined();
    });
  });
});
