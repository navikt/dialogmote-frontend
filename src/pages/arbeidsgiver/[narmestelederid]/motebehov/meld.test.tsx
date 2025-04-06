import { act, waitFor } from "@testing-library/react";
import { render, screen } from "../../../../test/testUtils";
import mockRouter from "next-router-mock";
import { rest } from "msw";
import { testServer } from "../../../../mocks/testServer";
import MeldBehov from "@/pages/arbeidsgiver/[narmestelederid]/motebehov/meld.page";
import { axe } from "vitest-axe";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

  it("should post on submit", async () => {
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
            formIdentifier: "motebehov-meld",
            formSemanticVersion: "1.0.0",
            fieldSnapshots: [
              {
                fieldId: "begrunnelseText",
                fieldLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
                fieldType: "TEXT",
                textValue: "Dette er en begrunnelse",
                description:
                  "Hva ønsker du å ta opp i møtet? Hva tenker du at NAV kan bistå med? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
              },
              {
                fieldType: "CHECKBOX_SINGLE",
                fieldId: "onskerSykmelderDeltarCheckbox",
                fieldLabel:
                  "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
                wasChecked: false,
              },
              {
                fieldType: "CHECKBOX_SINGLE",
                fieldId: "onskerTolkCheckbox",
                fieldLabel: "Vi har behov for tolk.",
                wasChecked: false,
              },
            ],
          },
        },
      })
    );
  });
});
