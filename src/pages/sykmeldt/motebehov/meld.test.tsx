import { act, waitFor, within } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import mockRouter from "next-router-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import MeldBehov from "@/pages/sykmeldt/motebehov/meld.page";
import { meldMotebehovSMFixture } from "../../../mocks/data/fixtures/form";
import { testServer } from "../../../mocks/testServer";
import { render, screen } from "../../../test/testUtils";

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
        http.post("*/api/sykmeldt/motebehov", async ({ request }) => {
          requestResolver(await request.json());
          return new HttpResponse(null, { status: 200 });
        }),
      );

      const { user } = render(<MeldBehov />);

      await user.type(
        screen.getByRole("textbox", {
          name: /Hvorfor ønsker du et dialogmøte/i,
        }),
        "Dette er en begrunnelse",
      );
      await user.click(
        screen.getByRole("button", {
          name: "Be om møte",
        }),
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
                fieldType: "TEXT",
                label: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
                value: "Dette er en begrunnelse",
                description:
                  "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
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

    it("with all inputs", async () => {
      const requestResolver = vi.fn();
      testServer.use(
        http.post("*/api/sykmeldt/motebehov", async ({ request }) => {
          requestResolver(await request.json());
          return new HttpResponse(null, { status: 200 });
        }),
      );

      const { user } = render(<MeldBehov />);

      await user.type(
        screen.getByRole("textbox", {
          name: /Hvorfor ønsker du et dialogmøte/i,
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
          name: "Be om møte",
        }),
      );

      await waitFor(() =>
        expect(requestResolver).toHaveBeenCalledWith({
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: "motebehov-arbeidstaker-meld",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: meldMotebehovSMFixture,
          },
        }),
      );
    });
  });

  it("should render error summary when required inputs is invalid", async () => {
    const { user } = render(<MeldBehov />);

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
        name: "Be om møte",
      }),
    );

    const errorSummaryHeading = await screen.findByRole("heading", {
      name: "For å gå videre må du rette opp følgende:",
    });
    expect(errorSummaryHeading).toBeInTheDocument();
    const errorSummaryList = screen.getAllByRole("list").find((list) =>
      within(list).queryByRole("link", {
        name: "Du må oppgi hvorfor du ønsker et dialogmøte.",
      }),
    );
    expect(errorSummaryList).toBeDefined();
    const errorSummary = within(errorSummaryList as HTMLElement);

    expect(
      errorSummary.getByRole("link", {
        name: "Du må oppgi hvorfor du ønsker et dialogmøte.",
      }),
    ).toBeInTheDocument();
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
