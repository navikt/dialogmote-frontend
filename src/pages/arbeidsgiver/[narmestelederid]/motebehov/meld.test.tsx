import { waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../../test/testUtils";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../../mocks/testServer";
import MeldBehov from "@/pages/arbeidsgiver/[narmestelederid]/motebehov/meld.page";
import { sykmeldtFixture } from "../../../../mocks/data/fixtures/sykmeldt";

describe("meld page arbeidsgiver", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/arbeidsgiver?narmestelederid=123");
  });

  it("should post on submit", async () => {
    const requestResolver = jest.fn();
    testServer.use(
      rest.post(`api/arbeidsgiver/motebehov`, async (req, res, ctx) => {
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
        name: `Jeg har behov for et møte med NAV og ${sykmeldtFixture.navn}`,
      })
    );
    await user.click(
      checkboxGroup.getByRole("checkbox", {
        name: "Jeg ønsker at den som sykmelder arbeidstakeren, også skal delta i møtet (valgfri).",
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
        arbeidstakerFnr: sykmeldtFixture.fnr,
        motebehovSvar: {
          forklaring:
            "Jeg ønsker at den som sykmelder arbeidstakeren, også skal delta i møtet (valgfri). Dette er en begrunnelse",
          harMotebehov: true,
        },
        virksomhetsnummer: sykmeldtFixture.orgnummer,
      })
    );
  });
});