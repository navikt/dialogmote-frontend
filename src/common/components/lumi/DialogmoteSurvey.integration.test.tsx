import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { surveySubmissionSchema } from "@/server/lumi/submission";
import { DialogmoteSurvey } from "./DialogmoteSurveyInvitation";
import { dialogmoteSurvey } from "./dialogmoteSurvey";

vi.mock("next/router", () => ({
  useRouter: () => ({ basePath: "/syk/dialogmoter" }),
}));

describe("shared Dialogmøte survey", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("keeps the form closed until the invitation is activated with the keyboard", async () => {
    const user = userEvent.setup();
    const { container } = render(<DialogmoteSurvey />);
    const invitation = await screen.findByRole("button", {
      name: "Del erfaringer med dialogmøte 1",
    });
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    await user.tab();
    expect(invitation).toHaveFocus();
    await user.keyboard("{Enter}");
    if (dialogmoteSurvey.intro) {
      await screen.findByRole("heading", {
        name: dialogmoteSurvey.intro.title,
      });
      await user.click(
        screen.getByRole("button", {
          name: "Start",
        }),
      );
    }
    await screen.findByRole("heading", {
      name: dialogmoteSurvey.pages[0].questions[0].prompt,
    });
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("submits the actual shared document through the BFF envelope without changing its survey type or definition", async () => {
    const user = userEvent.setup();
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetch);
    render(<DialogmoteSurvey />);
    await user.click(
      await screen.findByRole("button", {
        name: "Del erfaringer med dialogmøte 1",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(
      screen.getByRole("radio", {
        name: "Jeg er usikker på hva dialogmøte 1 er",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Send" }));
    await screen.findByText(/Kunne ikke sende tilbakemeldingen/);
    expect(
      screen.queryByRole("heading", { name: dialogmoteSurvey.success.title }),
    ).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("/syk/dialogmoter/api/lumi/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: expect.any(String),
    });
    await user.click(screen.getByRole("button", { name: "Send" }));
    await screen.findByRole("heading", {
      name: dialogmoteSurvey.success.title,
    });
    const payload = JSON.parse(fetch.mock.calls[0][1].body);
    const parsed = surveySubmissionSchema.safeParse(payload);
    expect(parsed.error?.issues).toBeUndefined();
    expect(parsed.success).toBe(true);
    expect(payload.surveyType).toBe(dialogmoteSurvey.type);
    expect(payload.definition.surveyType).toBe(dialogmoteSurvey.type);
    expect(payload.definition.fields).toHaveLength(6);
    expect(
      payload.answers.map((answer: { fieldId: string }) => answer.fieldId),
    ).toEqual(["rating"]);
    expect(payload.context.url).toBeUndefined();
    expect(payload.context.pathname).toBeUndefined();
  });

  it("discards closed branch answers after both Other follow-ups and a changed main answer", async () => {
    const user = userEvent.setup();
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetch);
    render(<DialogmoteSurvey />);
    await user.click(
      await screen.findByRole("button", {
        name: "Del erfaringer med dialogmøte 1",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("radio", { name: /Jeg har fulgt opp/ }));
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.click(screen.getByRole("checkbox", { name: "Annet" }));
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.type(screen.getByRole("textbox"), "hidden-reason-canary");
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.click(screen.getByRole("checkbox", { name: "Annet" }));
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.type(screen.getByRole("textbox"), "hidden-support-canary");
    for (let index = 0; index < 4; index++)
      await user.click(screen.getByRole("button", { name: "Tilbake" }));
    await user.click(
      screen.getByRole("radio", {
        name: "Jeg har gjennomført dialogmøte 1 det siste året",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.click(screen.getByRole("radio", { name: "I stor grad" }));
    expect(
      screen.queryByRole("button", { name: "Neste" }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Send" }));
    await screen.findByRole("heading", {
      name: dialogmoteSurvey.success.title,
    });
    const payload = JSON.parse(fetch.mock.calls[0][1].body);
    expect(surveySubmissionSchema.safeParse(payload).success).toBe(true);
    expect(
      payload.answers.map((answer: { fieldId: string }) => answer.fieldId),
    ).toEqual([
      dialogmoteSurvey.pages[0].questions[0].id,
      dialogmoteSurvey.pages[1].questions[0].id,
    ]);
    expect(JSON.stringify(payload)).not.toMatch(
      /hidden-reason-canary|hidden-support-canary/,
    );
  });
});
