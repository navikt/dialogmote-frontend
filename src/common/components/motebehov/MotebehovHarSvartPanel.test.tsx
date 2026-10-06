import { describe, expect, it } from "vitest";
import { MotebehovHarSvartPanel } from "@/common/components/motebehov/MotebehovHarSvartPanel";
import type {
  MotebehovSkjemaType,
  MotebehovSvar,
} from "@/types/shared/motebehov";
import { render, screen } from "../../../test/testUtils";

const svarfristText =
  "Du får svar fra en veileder i Nav innen tre uker. Svaret er enten en innkalling til dialogmøte eller en tilbakemelding om at det ikke blir møte.";

const createMotebehovSvar = (harMotebehov: boolean): MotebehovSvar => ({
  opprettetDato: "2026-10-06",
  virksomhetsnummer: "000111222",
  harMotebehov,
  formSnapshot: {
    formIdentifier: "motebehov-arbeidstaker-svar",
    formSemanticVersion: "1.0.0",
    fieldSnapshots: [],
  },
});

const renderPanel = (skjemaType: MotebehovSkjemaType, harMotebehov: boolean) =>
  render(
    <MotebehovHarSvartPanel
      motebehovSvar={createMotebehovSvar(harMotebehov)}
      skjemaType={skjemaType}
    />,
  );

describe("MotebehovHarSvartPanel", () => {
  it("informerer om svarfrist når brukeren har meldt behov", () => {
    renderPanel("MELD_BEHOV", true);

    expect(
      screen.getByRole("heading", { level: 3, name: "Hva skjer nå?" }),
    ).toBeInTheDocument();
    expect(screen.getByText(svarfristText)).toBeInTheDocument();
  });

  it("informerer om svarfrist når brukeren har svart ja på behov", () => {
    renderPanel("SVAR_BEHOV", true);

    expect(screen.getByText(svarfristText)).toBeInTheDocument();
  });

  it("informerer ikke om svarfrist når brukeren har svart nei på behov", () => {
    renderPanel("SVAR_BEHOV", false);

    expect(
      screen.queryByRole("heading", { name: "Hva skjer nå?" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(svarfristText)).not.toBeInTheDocument();
  });
});
