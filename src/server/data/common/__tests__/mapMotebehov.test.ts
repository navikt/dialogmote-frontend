import { mapMotebehov } from "@/server/data/common/mapMotebehov";
import { createMotebehov } from "../../../../tests/fixtures/motebehov";

describe("Data mapper for Motebehov", () => {
  it("should map ongoing Motebehov correctly", () => {
    const isLastBrevOngoingMotebehov = true;
    const motebehov = createMotebehov();
    const mappedMotebehov = mapMotebehov(motebehov, isLastBrevOngoingMotebehov);

    expect(mappedMotebehov).toEqual(undefined);
  });

  it("should map hidden Motebehov correctly", () => {
    const isLastBrevOngoingMotebehov = false;
    const motebehov = createMotebehov({ visMotebehov: false });
    const mappedMotebehov = mapMotebehov(motebehov, isLastBrevOngoingMotebehov);

    expect(mappedMotebehov).toEqual(undefined);
  });

  it("should map data correctly", () => {
    const isLastBrevOngoingMotebehov = false;
    const motebehov = createMotebehov();
    const mappedMotebehov = mapMotebehov(motebehov, isLastBrevOngoingMotebehov);

    expect(mappedMotebehov?.skjemaType).toEqual(motebehov.skjemaType);
    expect(mappedMotebehov?.svar).toEqual(
      expect.objectContaining({
        harMotebehov: motebehov.motebehov?.motebehovSvar.harMotebehov,
        forklaring: motebehov.motebehov?.motebehovSvar.forklaring,
        opprettetDato: motebehov.motebehov?.opprettetDato,
        virksomhetsnummer: motebehov.motebehov?.virksomhetsnummer,
      })
    );
  });
});
