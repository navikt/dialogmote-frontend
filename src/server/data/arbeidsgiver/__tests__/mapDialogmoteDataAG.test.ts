import { describe, expect, it } from "vitest";
import { mapDialogmoteDataAG } from "@/server/data/arbeidsgiver/mapDialogmoteDataAG";

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

describe("mapDialogmoteDataAG", () => {
  describe("motebehov", () => {
    it("should return undefined motebehov when sykmeldt has inactive sykmelding", () => {
      const dialogmoteData = mapDialogmoteDataAG(motebehovWithVisMotebehov, {
        ...baseSykmeldt,
        aktivSykmelding: false,
      }, []);

      expect(dialogmoteData.motebehov).toBeUndefined();
    });

    it("should return motebehov when sykmeldt has active sykmelding", () => {
      const dialogmoteData = mapDialogmoteDataAG(
        motebehovWithVisMotebehov,
        baseSykmeldt,
        [],
      );

      expect(dialogmoteData.motebehov).toBeDefined();
    });

    it("should return motebehov when sykmeldt has unknown sykmelding status", () => {
      const dialogmoteData = mapDialogmoteDataAG(motebehovWithVisMotebehov, {
        ...baseSykmeldt,
        aktivSykmelding: null,
      }, []);

      expect(dialogmoteData.motebehov).toBeDefined();
    });

    it("should return motebehov when sykmeldt has undefined sykmelding status", () => {
      const dialogmoteData = mapDialogmoteDataAG(motebehovWithVisMotebehov, {
        ...baseSykmeldt,
        aktivSykmelding: undefined,
      }, []);

      expect(dialogmoteData.motebehov).toBeDefined();
    });
  });
});
