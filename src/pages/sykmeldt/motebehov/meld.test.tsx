import { waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../test/testUtils";
import MeldBehov from "@/pages/sykmeldt/motebehov/meld.page";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../mocks/testServer";
describe("meld page sykmeldt", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/sykmeldt");
  });

  it("should post on submit", async () => {
    const requestResolver = jest.fn();
    testServer.use(
      rest.post("/api/sykmeldt/motebehov", async (req, res, ctx) => {
        requestResolver(await req.json());
        return res(ctx.status(200));
      })
    );

    const { user } = render(<MeldBehov />);

    const checkboxGroup = within(
      await screen.findByRole("group", {
        name: "Meld behov for møte",
      })
    );
    await user.click(
      checkboxGroup.getByRole("checkbox", {
        name: "Jeg har behov for et møte med NAV og arbeidsgiveren min.",
      })
    );
    await user.click(
      checkboxGroup.getByRole("checkbox", {
        name: /Jeg ønsker at den som sykmelder meg,/i,
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
        forklaring:
          "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). Dette er en begrunnelse",
        harMotebehov: true,
      })
    );
  });
});
