import { act, waitFor, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { axe } from "vitest-axe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSvarBehovAG,
  createSvarBehovSM,
} from "../../../../mocks/data/factories/dialogmote";
import { testServer } from "../../../../mocks/testServer";
import { render, screen } from "../../../../test/testUtils";
import SvarBehov from "@/pages/arbeidsgiver/[narmestelederid]/motebehov/svar.page";
import { svarMotebehovAGFixture } from "../../../../mocks/data/fixtures/form";

describe("svar page arbeidsgiver", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/arbeidsgiver?narmestelederid=123");
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
        rest.post("/api/arbeidsgiver/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        }),
        rest.get("/api/arbeidsgiver", (_req, res, ctx) => {
          return res(ctx.json(createSvarBehovAG()));
        })
      );

      const { user } = render(<SvarBehov />);

      const radioGroup = within(
        await screen.findByRole("group", {
          name: "Har dere behov for et dialogmøte med NAV?",
        })
      );
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Nei, vi har ikke behov for et dialogmøte nå.",
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
          arbeidstakerFnr: "12345678912345",
          virksomhetsnummer: "123456789",
          formSubmission: {
            harMotebehov: false,
            formSnapshot: {
              formIdentifier: "motebehov-arbeidsgiver-svar",
              formSemanticVersion: "1.0.0",
              fieldSnapshots: [
                {
                  fieldId: "harBehovRadioGroup",
                  fieldType: "RADIO_GROUP",
                  label: "Har dere behov for et dialogmøte med NAV?",
                  description:
                    "Du svarer på vegne av arbeidsgiver. Den ansatte har fått det samme spørsmålet og svarer på vegne av seg selv.",
                  options: [
                    {
                      optionId: "Ja",
                      optionLabel: "Ja, vi har behov for et dialogmøte.",
                      wasSelected: false,
                    },
                    {
                      optionId: "Nei",
                      optionLabel:
                        "Nei, vi har ikke behov for et dialogmøte nå.",
                      wasSelected: true,
                    },
                  ],
                  selectedOptionId: "Nei",
                  selectedOptionLabel:
                    "Nei, vi har ikke behov for et dialogmøte nå.",
                },
                {
                  fieldId: "begrunnelseText",
                  fieldType: "TEXT",
                  label: "Begrunnelse (må fylles ut)",
                  description:
                    "Hvorfor mener du det ikke er behov for et dialogmøte? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
                  value: "Ingen grunn til å ha møte",
                  wasRequired: true,
                },
              ],
            },
          },
        })
      );
    });

    it("with motebehov and minimal input", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post("/api/arbeidsgiver/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        }),
        rest.get("/api/arbeidsgiver", (_req, res, ctx) => {
          return res(ctx.json(createSvarBehovAG()));
        })
      );

      const { user } = render(<SvarBehov />);

      const radioGroup = within(
        await screen.findByRole("group", {
          name: "Har dere behov for et dialogmøte med NAV?",
        })
      );
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Ja, vi har behov for et dialogmøte.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Begrunnelse (må fylles ut)",
        }),
        "Dette er en begrunnelse"
      );
      await user.click(
        screen.getByRole("button", {
          name: "Send svar",
        })
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          arbeidstakerFnr: "12345678912345",
          virksomhetsnummer: "123456789",
          formSubmission: {
            harMotebehov: true,
            formSnapshot: {
              formIdentifier: "motebehov-arbeidsgiver-svar",
              formSemanticVersion: "1.0.0",
              fieldSnapshots: [
                {
                  fieldId: "harBehovRadioGroup",
                  fieldType: "RADIO_GROUP",
                  label: "Har dere behov for et dialogmøte med NAV?",
                  description:
                    "Du svarer på vegne av arbeidsgiver. Den ansatte har fått det samme spørsmålet og svarer på vegne av seg selv.",
                  options: [
                    {
                      optionId: "Ja",
                      optionLabel: "Ja, vi har behov for et dialogmøte.",
                      wasSelected: true,
                    },
                    {
                      optionId: "Nei",
                      optionLabel:
                        "Nei, vi har ikke behov for et dialogmøte nå.",
                      wasSelected: false,
                    },
                  ],
                  selectedOptionId: "Ja",
                  selectedOptionLabel: "Ja, vi har behov for et dialogmøte.",
                },
                {
                  fieldId: "begrunnelseText",
                  fieldType: "TEXT",
                  label: "Begrunnelse (må fylles ut)",
                  description:
                    "Hva ønsker du å ta opp i møtet? Hva tenker du at NAV kan bistå med? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
                  value: "Dette er en begrunnelse",
                  wasRequired: true,
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

    it("with motebehov and all inputs", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        rest.post("/api/arbeidsgiver/motebehov", async (req, res, ctx) => {
          requestResolver(await req.json());
          return res(ctx.status(200));
        }),
        rest.get("/api/arbeidsgiver", (_req, res, ctx) => {
          return res(ctx.json(createSvarBehovAG()));
        })
      );

      const { user } = render(<SvarBehov />);

      const radioGroup = within(
        await screen.findByRole("group", {
          name: "Har dere behov for et dialogmøte med NAV?",
        })
      );
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Ja, vi har behov for et dialogmøte.",
        })
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Begrunnelse (må fylles ut)",
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
          name: "Send svar",
        })
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          arbeidstakerFnr: "12345678912345",
          virksomhetsnummer: "123456789",
          formSubmission: {
            harMotebehov: true,
            formSnapshot: {
              formIdentifier: "motebehov-arbeidsgiver-svar",
              formSemanticVersion: "1.0.0",
              fieldSnapshots: svarMotebehovAGFixture,
            },
          },
        })
      );
    });
  });

  it("should render error summary when required inputs is invalid", async () => {
    testServer.use(
      rest.get("/api/arbeidsgiver", (_req, res, ctx) => {
        return res(ctx.json(createSvarBehovSM()));
      })
    );
    const { user } = render(<SvarBehov />);

    const radioGroup = within(
      await screen.findByRole("group", {
        name: "Har dere behov for et dialogmøte med NAV?",
      })
    );
    await user.click(
      radioGroup.getByRole("radio", {
        name: "Ja, vi har behov for et dialogmøte.",
      })
    );
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
        name: "Du må gi en begrunnelse for hvorfor du svarte ja eller nei.",
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
