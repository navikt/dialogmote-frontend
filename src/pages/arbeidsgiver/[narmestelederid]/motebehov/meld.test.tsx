import { act, waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../../test/testUtils";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../../mocks/testServer";
import MeldBehov from "@/pages/arbeidsgiver/[narmestelederid]/motebehov/meld.page";
import { axe } from "vitest-axe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { meldMotebehovAGFixture } from "../../../../mocks/data/fixtures/form";

describe("meld page arbeidsgiver", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/arbeidsgiver?narmestelederid=123");
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
        rest.post(`api/arbeidsgiver/motebehov`, async (req, res, ctx) => {
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
          arbeidstakerFnr: "12345678912345",
          virksomhetsnummer: "123456789",
          formSubmission: {
            harMotebehov: true,
            formSnapshot: {
              formIdentifier: "motebehov-arbeidsgiver-meld",
              formSemanticVersion: "1.0.0",
              fieldSnapshots: [
                {
                  fieldId: "begrunnelseText",
                  fieldType: "TEXT",
                  label: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
                  value: "Dette er en begrunnelse",
                  description:
                    "Hva ønsker du å ta opp i møtet? Hva tenker du at Nav kan bistå med? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
                },
                {
                  fieldId: "onskerSykmelderDeltarCheckbox",
                  fieldType: "CHECKBOX_SINGLE",
                  label:
                    "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
                  value: false,
                },
                {
                  fieldId: "onskerTolkCheckbox",
                  fieldType: "CHECKBOX_SINGLE",
                  label: "Vi har behov for tolk.",
                  value: false,
                },
              ],
            },
          },
        })
      );
    });

    it("with all inputs", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post(`api/arbeidsgiver/motebehov`, async (req, res, ctx) => {
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
        screen.getByRole("checkbox", {
          name: "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
        }),
        "Behandler må være med"
      );
      await user.click(
        screen.getByRole("checkbox", {
          name: "Vi har behov for tolk.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Hva slags tolk har dere behov for? (Må fylles ut)",
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
          arbeidstakerFnr: "12345678912345",
          virksomhetsnummer: "123456789",
          formSubmission: {
            harMotebehov: true,
            formSnapshot: {
              fieldSnapshots: meldMotebehovAGFixture,
              formIdentifier: "motebehov-arbeidsgiver-meld",
              formSemanticVersion: "1.0.0",
            },
          },
        })
      );
    });
  });

  it("should render error summary when required inputs is invalid", async () => {
    const { user } = render(<MeldBehov />);

    await user.click(
      screen.getByRole("checkbox", {
        name: "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
      })
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: "Vi har behov for tolk.",
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
