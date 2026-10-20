import { describe, expect, it } from "vitest";
import { mapDialogmoteDataAG } from "@/server/data/arbeidsgiver/mapDialogmoteDataAG";
import { getMockSetupForScenario } from "@/server/data/mock/activeMockData";
import { mapDialogmoteDataSM } from "@/server/data/sykmeldt/mapDialogmoteDataSM";
import { render, screen } from "../../../../test/testUtils";
import { MotebehovPanelAG } from "./MotebehovPanelAG";
import { MotebehovPanelSM } from "./MotebehovPanelSM";

describe.each(["MOTEBEHOV_MELDT", "MOTEBEHOV_SVART_JA"] as const)(
  "%s landing panel",
  (scenario) => {
    it.each(["SM", "AG"] as const)(
      "renders the submitted state and audience-correct receipt for %s",
      (audience) => {
        const setup = getMockSetupForScenario(scenario);
        if (!setup.sykmeldt) throw new Error("Missing mock sykmeldt");
        const data =
          audience === "SM"
            ? mapDialogmoteDataSM(setup.motebehovSM)
            : mapDialogmoteDataAG(setup.motebehovAG, setup.sykmeldt);
        render(
          audience === "SM" ? (
            <MotebehovPanelSM motebehov={data.motebehov} />
          ) : (
            <MotebehovPanelAG motebehov={data.motebehov} />
          ),
        );

        expect(
          screen.getByRole("heading", {
            name:
              scenario === "MOTEBEHOV_MELDT"
                ? "Du har bedt om et dialogmøte med Nav"
                : "Du har svart at dere har behov for et dialogmøte",
          }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: "Hva skjer nå?" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: "Svaret ditt" }),
        ).toBeInTheDocument();
        expect(screen.getByText(/^Sendt:/)).toBeInTheDocument();
        expect(screen.getByText("Dette er en begrunnelse")).toBeInTheDocument();
        const tolkLabel =
          audience === "SM"
            ? "Jeg har behov for tolk."
            : "Vi har behov for tolk.";
        const otherTolkLabel =
          audience === "SM"
            ? "Vi har behov for tolk."
            : "Jeg har behov for tolk.";
        expect(screen.getByText(tolkLabel)).toBeInTheDocument();
        expect(screen.queryByText(otherTolkLabel)).not.toBeInTheDocument();
        expect(
          screen.queryByRole("link", { name: /Gå til tjenesten/ }),
        ).not.toBeInTheDocument();
        if (scenario === "MOTEBEHOV_SVART_JA") {
          expect(
            screen.getByText(
              audience === "SM"
                ? "Ja, jeg ønsker et dialogmøte."
                : "Ja, vi har behov for et dialogmøte.",
            ),
          ).toBeInTheDocument();
        }
      },
    );
  },
);
