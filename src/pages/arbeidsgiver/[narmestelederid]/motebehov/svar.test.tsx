import { act, waitFor, within } from "@testing-library/react";
import { render, screen } from "../../../../test/testUtils";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../../mocks/testServer";
import SvarBehov from "@/pages/arbeidsgiver/[narmestelederid]/motebehov/svar.page";
import { sykmeldtFixture } from "../../../../mocks/data/fixtures/sykmeldt";
import { axe } from "jest-axe";

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

  it("should post on submit", async () => {
    const requestResolver = jest.fn();
    testServer.use(
      rest.post("/api/arbeidsgiver/motebehov", async (req, res, ctx) => {
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
    await screen.findByRole("heading", {
      level: 1,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name: sykmeldtFixture.navn!,
    });
    await user.click(
      screen.getByRole("button", {
        name: "Send svar",
      })
    );

    await waitFor(() =>
      expect(requestResolver).toHaveBeenCalledWith({
        arbeidstakerFnr: sykmeldtFixture.fnr,
        motebehovSvar: {
          forklaring: "Dette er en begrunnelse",
          harMotebehov: true,
        },
        virksomhetsnummer: sykmeldtFixture.orgnummer,
      })
    );
  });
});
