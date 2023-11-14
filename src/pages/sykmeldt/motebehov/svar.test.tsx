import { act, waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../test/testUtils";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../mocks/testServer";
import SvarBehov from "@/pages/sykmeldt/motebehov/svar.page";
import { axe } from "jest-axe";

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
    const requestResolver = jest.fn();
    testServer.use(
      rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
        requestResolver(await req.json());
        return res(ctx.status(200));
      })
    );

    const { user } = render(<SvarBehov />);

    const checkboxGroup = within(
      await screen.findByRole("group", {
        name: "Har dere behov for et møte med NAV?",
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
});
