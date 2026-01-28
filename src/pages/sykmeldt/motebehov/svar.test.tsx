import { act, waitFor, within } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import mockRouter from "next-router-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import SvarBehov from "@/pages/sykmeldt/motebehov/svar.page";
import { createSvarBehovSM } from "../../../mocks/data/factories/dialogmote";
import { svarMotebehovSMFixture } from "../../../mocks/data/fixtures/form";
import { testServer } from "../../../mocks/testServer";
import { render, screen } from "../../../test/testUtils";

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
        http.post("*/api/sykmeldt/motebehov", async ({ request }) => {
          requestResolver(await request.json());
          return new HttpResponse(null, { status: 200 });
        }),
        http.get("*/api/sykmeldt", () => {
          return HttpResponse.json(createSvarBehovSM());
        }),
      );

      const { user } = render(<SvarBehov />);

      const radioGroupElement = await screen.findByRole("group", {
        name: "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
      });
      const radioGroup = within(radioGroupElement);
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Nei, jeg mener det ikke er behov for et dialogmøte.",
        }),
      );
      await user.type(
        screen.getByRole("textbox", {
          name: /Begrunnelse/i,
        }),
        "Ingen grunn til å ha møte",
      );
      await user.click(
        screen.getByRole("button", {
          name: "Send svar",
        }),
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
                fieldType: "RADIO_GROUP",
                label: "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
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
        }),
      );
    });

    it("with motebehov and minimal input", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        http.post("*/api/sykmeldt/motebehov", async ({ request }) => {
          requestResolver(await request.json());
          return new HttpResponse(null, { status: 200 });
        }),
        http.get("*/api/sykmeldt", () => {
          return HttpResponse.json(createSvarBehovSM());
        }),
      );

      const { user } = render(<SvarBehov />);

      const radioGroupElement = await screen.findByRole("group", {
        name: "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
      });
      const radioGroup = within(radioGroupElement);
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Ja, jeg ønsker et dialogmøte.",
        }),
      );
      await user.click(
        screen.getByRole("button", {
          name: "Send svar",
        }),
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
                fieldType: "RADIO_GROUP",
                label: "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
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
                fieldId: "begrunnelseText",
                fieldType: "TEXT",
                label: "Begrunnelse (valgfri)",
                description:
                  "Hva ønsker du å ta opp i møtet? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
                value: "",
                wasRequired: false,
              },
              {
                fieldId: "onskerSykmelderDeltarCheckbox",
                fieldType: "CHECKBOX_SINGLE",
                label:
                  "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
                value: false,
              },
              {
                fieldId: "onskerTolkCheckbox",
                fieldType: "CHECKBOX_SINGLE",
                label: "Jeg har behov for tolk.",
                value: false,
              },
            ],
          },
        }),
      );
    });

    it("with motebehov and all inputs", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        http.post("*/api/sykmeldt/motebehov", async ({ request }) => {
          requestResolver(await request.json());
          return new HttpResponse(null, { status: 200 });
        }),
        http.get("*/api/sykmeldt", () => {
          return HttpResponse.json(createSvarBehovSM());
        }),
      );

      const { user } = render(<SvarBehov />);

      const radioGroupElement = await screen.findByRole("group", {
        name: "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
      });
      const radioGroup = within(radioGroupElement);
      await user.click(
        radioGroup.getByRole("radio", {
          name: "Ja, jeg ønsker et dialogmøte.",
        }),
      );
      await user.type(
        screen.getByRole("textbox", {
          name: /Begrunnelse/i,
        }),
        "Dette er en begrunnelse",
      );

      await user.click(
        screen.getByRole("checkbox", {
          name: "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
        }),
      );
      await user.type(
        screen.getByRole("textbox", {
          name: /Hvorfor ønsker du at lege\/behandler deltar/i,
        }),
        "Behandler må være med",
      );
      await user.click(
        screen.getByRole("checkbox", {
          name: "Jeg har behov for tolk.",
        }),
      );
      await user.type(
        screen.getByRole("textbox", {
          name: /Hva slags tolk har du behov for/i,
        }),
        "Engelsk tolk",
      );
      await user.click(
        screen.getByRole("button", {
          name: "Send svar",
        }),
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: "motebehov-arbeidstaker-svar",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: svarMotebehovSMFixture,
          },
        }),
      );
    });
  });

  it("should render error summary when required inputs is invalid", async () => {
    testServer.use(
      http.get("*/api/sykmeldt", () => {
        return HttpResponse.json(createSvarBehovSM());
      }),
    );
    const { user } = render(<SvarBehov />);

    const radioGroupElement = await screen.findByRole("group", {
      name: "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
    });
    const radioGroup = within(radioGroupElement);
    await user.click(
      radioGroup.getByRole("radio", {
        name: "Ja, jeg ønsker et dialogmøte.",
      }),
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
      }),
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: "Jeg har behov for tolk.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Send svar",
      }),
    );

    const errorSummaryHeading = await screen.findByRole("heading", {
      name: "For å gå videre må du rette opp følgende:",
    });
    expect(errorSummaryHeading).toBeInTheDocument();
    const errorSummaryList = screen.getAllByRole("list").find((list) =>
      within(list).queryByRole("link", {
        name: "Du må begrunne hvorfor du ønsker at behandler deltar.",
      }),
    );
    expect(errorSummaryList).toBeDefined();
    const errorSummary = within(errorSummaryList as HTMLElement);

    expect(
      errorSummary.getByRole("link", {
        name: "Du må begrunne hvorfor du ønsker at behandler deltar.",
      }),
    ).toBeInTheDocument();
    expect(
      errorSummary.getByRole("link", {
        name: "Du må oppgi hva slags tolk dere har behov for.",
      }),
    ).toBeInTheDocument();
  });
});
