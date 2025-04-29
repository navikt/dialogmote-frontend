import { act, waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../test/testUtils";
import MeldBehov from "@/pages/sykmeldt/motebehov/meld.page";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../mocks/testServer";
import { axe } from "vitest-axe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { meldMotebehovSMFixture } from "../../../mocks/data/fixtures/form";

describe("meld page sykmeldt", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/sykmeldt");
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<MeldBehov />);

    await act(async () => {
      const result = await axe(container);
      expect(result).toHaveNoViolations();
    });
  });

  describe("should post form", () => {
    it("with minimum inputs", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        })
      );

      const { user } = render(<MeldBehov />);

      await user.type(
        screen.getByRole("textbox", {
          name: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
        }),
        "Dette er en begrunnelse"
      );
      await user.click(
        screen.getByRole("button", {
          name: "Be om møte",
        })
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: "motebehov-arbeidstaker-meld",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: [
              {
                fieldId: "begrunnelseText",
                fieldLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
                fieldType: "TEXT",
                value: "Dette er en begrunnelse",
                description:
                  "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
              },
              {
                fieldType: "CHECKBOX_SINGLE",
                fieldId: "onskerSykmelderDeltarCheckbox",
                fieldLabel:
                  "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
                value: false,
              },
              {
                fieldType: "CHECKBOX_SINGLE",
                fieldId: "onskerTolkCheckbox",
                fieldLabel: "Jeg har behov for tolk.",
                value: false,
              },
            ],
          },
        })
      );
    });

    it.skip("with all inputs", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        })
      );

      const { user } = render(<MeldBehov />);

      await user.type(
        screen.getByRole("textbox", {
          name: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
        }),
        "Dette er en begrunnelse"
      );

      const checkboxGroup = within(
        await screen.findByRole("group", {
          name: "Andre valg",
        })
      );
      await user.click(
        checkboxGroup.getByRole("checkbox", {
          name: "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
        }),
        "Behandler må være med"
      );
      await user.click(
        checkboxGroup.getByRole("checkbox", {
          name: "Jeg har behov for tolk.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Hva slags tolk har du behov for? (Må fylles ut)",
        }),
        "Engelsk tolk"
      );
      await user.click(
        screen.getByRole("button", {
          name: "Be om møte",
        })
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: "motebehov-arbeidstaker-meld",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: meldMotebehovSMFixture,
          },
        })
      );
    });
  });

  it.skip("should render error summary when required inputs is invalid", async () => {
    const { user } = render(<MeldBehov />);

    const checkboxGroup = within(
      await screen.findByRole("group", { name: "Andre valg" })
    );
    await user.click(
      checkboxGroup.getByRole("checkbox", {
        name: "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
      })
    );
    await user.click(
      checkboxGroup.getByRole("checkbox", {
        name: "Jeg har behov for tolk.",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Be om møte",
      })
    );

    const errorSummary = within(
      await screen.findByRole("region", {
        name: "For å gå videre må du rette opp følgende:",
      })
    );

    expect(
      errorSummary.getByRole("link", {
        name: "Du må oppgi hvorfor du ønsker et dialogmøte.",
      })
    ).toBeInTheDocument();
    expect(
      errorSummary.getByRole("link", {
        name: "Du må begrunne hvorfor du ønsker at behandler deltar.",
      })
    ).toBeInTheDocument();
    expect(
      errorSummary.getByRole("link", {
        name: "Du må oppgi hva slags tolk dere har behov for.",
      })
    ).toBeInTheDocument();
  });
});
