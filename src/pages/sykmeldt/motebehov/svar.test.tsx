import { act, waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../test/testUtils";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../mocks/testServer";
import SvarBehov from "@/pages/sykmeldt/motebehov/svar.page";
import { axe } from "vitest-axe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createDialogmoteSM,
  createSvarBehovSM,
} from "../../../mocks/data/factories/dialogmote";

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

  it("should post on submit", async () => {
    const requestResolver = vi.fn();
    testServer.use(
      rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
        requestResolver(await req.json());
        return res(ctx.status(200));
      }),
      rest.get("/api/sykmeldt", (req, res, ctx) => {
        return res(ctx.json(createSvarBehovSM()));
      })
    );

    const { user } = render(<SvarBehov />);

    const checkboxGroup = within(
      await screen.findByRole("group", {
        name: "Har du behov for et møte med NAV og arbeidsgiveren din?",
      })
    );
    await user.click(
      checkboxGroup.getByRole("radio", {
        name: "Ja, jeg mener det er behov for et møte",
      })
    );
    await user.type(
      screen.getByRole("textbox", {
        name: "Begrunnelse (valgfri)",
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
        forklaring: "Dette er en begrunnelse",
        harMotebehov: true,
      })
    );
  });

  it("displays error message if unable to display form", async () => {
    testServer.use(
      rest.get("/api/sykmeldt", (req, res, ctx) => {
        return res(ctx.json(createDialogmoteSM()));
      })
    );

    render(<SvarBehov />);

    const bodyLongElement = await screen.findByText(
      "Du har mottatt et varsel du ikke skal ha. Du skal derfor ikke svare på om du har behov for dialogmøte."
    );
    expect(bodyLongElement).toBeInTheDocument();
  });
});
