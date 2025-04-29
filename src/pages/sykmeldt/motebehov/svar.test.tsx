import { act, waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../test/testUtils";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../mocks/testServer";
import { axe } from "vitest-axe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SvarBehov from "@/pages/sykmeldt/motebehov/svar.page";
import { createSvarBehovSM } from "../../../mocks/data/factories/dialogmote";
import { svarMotebehovSMFixture } from "../../../mocks/data/fixtures/form";

describe("svar page sykmeldt", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/sykmeldt");
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<SvarBehov />);

    await act(async () => {
      const result = await axe(container);
      expect(result).toHaveNoViolations();
    });
  });

  describe("should post form", () => {
    it("with no motebehov", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        }),
        rest.get("/api/sykmeldt", (_req, res, ctx) => {
          return res(ctx.json(createSvarBehovSM()));
        })
      );

      const { user } = render(<SvarBehov />);

      const radioGroup = within(
        await screen.findByRole("group", {
          name: "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
        })
      );
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Nei, jeg mener det ikke er behov for et dialogmøte.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Begrunnelse (må fylles ut)",
        }),
        "Ingen grunn til å ha møte"
      );
      await user.click(
        screen.getByRole("button", {
          name: "Send svar",
        })
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          harMotebehov: false,
          formSnapshot: {
            formIdentifier: "motebehov-arbeidstaker-svar",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: [
              {
                fieldId: "harBehovRadioGroup",
                fieldLabel:
                  "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
                fieldType: "RADIO_GROUP",
                options: [
                  {
                    optionId: "Ja",
                    optionLabel: "Ja, jeg ønsker et dialogmøte.",
                    wasSelected: false,
                  },
                  {
                    optionId: "Nei",
                    optionLabel:
                      "Nei, jeg mener det ikke er behov for et dialogmøte.",
                    wasSelected: true,
                  },
                ],
                selectedOptionId: "Nei",
                selectedOptionLabel:
                  "Nei, jeg mener det ikke er behov for et dialogmøte.",
              },
              {
                description:
                  "Hvorfor mener du det ikke er behov for et dialogmøte? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
                fieldId: "begrunnelseText",
                fieldLabel: "Begrunnelse (må fylles ut)",
                fieldType: "TEXT",
                value: "Ingen grunn til å ha møte",
                wasRequired: true,
              },
            ],
          },
        })
      );
    });

    it("with motebehov and minimal input", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        }),
        rest.get("/api/sykmeldt", (_req, res, ctx) => {
          return res(ctx.json(createSvarBehovSM()));
        })
      );

      const { user } = render(<SvarBehov />);

      const radioGroup = within(
        await screen.findByRole("group", {
          name: "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
        })
      );
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Ja, jeg ønsker et dialogmøte.",
        })
      );
      await user.click(
        screen.getByRole("button", {
          name: "Send svar",
        })
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: "motebehov-arbeidstaker-svar",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: [
              {
                fieldId: "harBehovRadioGroup",
                fieldLabel:
                  "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
                fieldType: "RADIO_GROUP",
                options: [
                  {
                    optionId: "Ja",
                    optionLabel: "Ja, jeg ønsker et dialogmøte.",
                    wasSelected: true,
                  },
                  {
                    optionId: "Nei",
                    optionLabel:
                      "Nei, jeg mener det ikke er behov for et dialogmøte.",
                    wasSelected: false,
                  },
                ],
                selectedOptionId: "Ja",
                selectedOptionLabel: "Ja, jeg ønsker et dialogmøte.",
              },
              {
                description:
                  "Hva ønsker du å ta opp i møtet? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
                fieldId: "begrunnelseText",
                fieldLabel: "Begrunnelse (valgfri)",
                fieldType: "TEXT",
                value: "",
                wasRequired: false,
              },
              {
                fieldId: "onskerSykmelderDeltarCheckbox",
                fieldLabel:
                  "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
                fieldType: "CHECKBOX_SINGLE",
                value: false,
              },
              {
                fieldId: "onskerTolkCheckbox",
                fieldLabel: "Jeg har behov for tolk.",
                fieldType: "CHECKBOX_SINGLE",
                value: false,
              },
            ],
          },
        })
      );
    });

    it("with motebehov and all inputs", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        }),
        rest.get("/api/sykmeldt", (_req, res, ctx) => {
          return res(ctx.json(createSvarBehovSM()));
        })
      );

      const { user } = render(<SvarBehov />);

      const radioGroup = within(
        await screen.findByRole("group", {
          name: "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
        })
      );
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Ja, jeg ønsker et dialogmøte.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Begrunnelse (valgfri)",
        }),
        "Dette er en begrunnelse"
      );

      await user.click(
        screen.getByRole("checkbox", {
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
        screen.getByRole("checkbox", {
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
          name: "Send svar",
        })
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: "motebehov-arbeidstaker-svar",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: svarMotebehovSMFixture,
          },
        })
      );
    });
  });

  it("should render error summary when required inputs is invalid", async () => {
    testServer.use(
      rest.get("/api/sykmeldt", (_req, res, ctx) => {
        return res(ctx.json(createSvarBehovSM()));
      })
    );
    const { user } = render(<SvarBehov />);

    const radioGroup = within(
      await screen.findByRole("group", {
        name: "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
      })
    );
    await user.click(
      radioGroup.getByRole("radio", {
        name: "Ja, jeg ønsker et dialogmøte.",
      })
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
      })
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: "Jeg har behov for tolk.",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Send svar",
      })
    );

    const errorSummary = within(
      await screen.findByRole("region", {
        name: "For å gå videre må du rette opp følgende:",
      })
    );

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
