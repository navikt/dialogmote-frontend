import { waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { TEST_SESSION_ID } from "@/common/api/fetch";
import { render, screen } from "../../../test/testUtils";
import { DemoBanner } from "./DemoBanner";

const mockRouter = vi.hoisted(() => ({
  basePath: "/syk/dialogmoter",
  pathname: "/sykmeldt",
  asPath: "/sykmeldt",
  query: {} as Record<string, string>,
  push: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: () => mockRouter,
}));
vi.mock("@/common/publicEnv", () => ({ isDemoOrLocal: true }));

const fetch = vi.fn<typeof globalThis.fetch>();
let activeScenario = "MELD_BEHOV";

const setRoute = (
  pathname: string,
  asPath: string,
  query: Record<string, string> = {},
) => {
  mockRouter.pathname = pathname;
  mockRouter.asPath = asPath;
  mockRouter.query = query;
};

beforeEach(() => {
  localStorage.removeItem(TEST_SESSION_ID);
  setRoute("/sykmeldt", "/sykmeldt");
  activeScenario = "MELD_BEHOV";
  mockRouter.push.mockReset();
  fetch.mockReset().mockImplementation(async (_url, init) => {
    if (init?.method === "POST") {
      activeScenario = JSON.parse(String(init.body));
      return new Response(null, { status: 200 });
    }
    return Response.json(activeScenario);
  });
  vi.stubGlobal("fetch", fetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.removeItem(TEST_SESSION_ID);
});

describe("DemoBanner", () => {
  it("shows the demo warning and all seven scenarios in two native groups", async () => {
    render(<DemoBanner />);

    expect(
      screen.getByText(
        "Dette er en demoside og inneholder ikke dine personlige data.",
      ),
    ).toBeInTheDocument();
    const select = screen.getByRole("combobox", { name: "Scenario" });
    await waitFor(() => expect(select).toBeEnabled());
    expect(select).toHaveValue("MELD_BEHOV");
    const motebehovGroup = screen.getByRole("group", { name: "Møtebehov" });
    const dialogmoteGroup = screen.getByRole("group", { name: "Dialogmøte" });
    expect(motebehovGroup.tagName).toBe("OPTGROUP");
    expect(dialogmoteGroup.tagName).toBe("OPTGROUP");
    expect(
      within(motebehovGroup)
        .getAllByRole("option")
        .map((option) => option.textContent),
    ).toEqual([
      "Meld møtebehov",
      "Svar på møtebehov",
      "Møtebehov meldt",
      "Svart ja på behov",
    ]);
    expect(
      within(dialogmoteGroup)
        .getAllByRole("option")
        .map((option) => option.textContent),
    ).toEqual([
      "Innkalling til Dialogmøte",
      "Endret Dialogmøte",
      "Avlyst Dialogmøte",
    ]);
    expect(screen.getAllByRole("option")).toHaveLength(7);
  });

  it.each(["MOTEBEHOV_MELDT", "MOTEBEHOV_SVART_JA"])(
    "changes to %s through the existing mutation and refreshes queries",
    async (scenario) => {
      let postedScenario = "MELD_BEHOV";
      let finishPost: () => void = () => {
        throw new Error("POST not started");
      };
      fetch.mockImplementation(async (_url, init) => {
        if (init?.method === "POST") {
          return new Promise<Response>((resolve) => {
            finishPost = () => {
              postedScenario = scenario;
              resolve(new Response(null, { status: 200 }));
            };
          });
        }
        return Response.json(postedScenario);
      });
      const { user } = render(<DemoBanner />);
      const select = screen.getByRole("combobox", { name: "Scenario" });
      await waitFor(() => expect(select).toBeEnabled());
      const previousSessionId = localStorage.getItem(TEST_SESSION_ID);

      await user.selectOptions(select, scenario);
      await waitFor(() => expect(select).toBeDisabled());
      const newSessionId = localStorage.getItem(TEST_SESSION_ID);
      expect(newSessionId).toBeTruthy();
      expect(newSessionId).not.toBe(previousSessionId);
      expect(fetch).toHaveBeenCalledWith(
        "/syk/dialogmoter/api/scenario/activescenario",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(scenario),
          headers: expect.objectContaining({ [TEST_SESSION_ID]: newSessionId }),
        }),
      );

      finishPost();
      await waitFor(() => expect(select).toHaveValue(scenario));
      expect(select).toBeEnabled();
      expect(fetch).toHaveBeenLastCalledWith(
        "/syk/dialogmoter/api/scenario/activescenario",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({ [TEST_SESSION_ID]: newSessionId }),
        }),
      );
    },
  );

  it.each([
    ["/sykmeldt/motebehov/meld", "/sykmeldt/motebehov/meld", {}, "/sykmeldt"],
    [
      "/arbeidsgiver/[narmestelederid]/motebehov/svar",
      "/arbeidsgiver/123/motebehov/svar",
      { narmestelederid: "123" },
      "/arbeidsgiver/123",
    ],
  ])(
    "navigates from %s to the landing page after a successful change",
    async (pathname, asPath, query, landingUrl) => {
      setRoute(pathname, asPath, query);
      const { user } = render(<DemoBanner />);
      const select = screen.getByRole("combobox", { name: "Scenario" });
      await waitFor(() => expect(select).toBeEnabled());

      await user.selectOptions(select, "MOTEBEHOV_MELDT");

      await waitFor(() =>
        expect(mockRouter.push).toHaveBeenCalledWith(landingUrl),
      );
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    },
  );

  it("stays on the landing page and does not navigate", async () => {
    const { user } = render(<DemoBanner />);
    const select = screen.getByRole("combobox", { name: "Scenario" });
    await waitFor(() => expect(select).toBeEnabled());

    await user.selectOptions(select, "MOTEBEHOV_MELDT");

    await waitFor(() => expect(select).toHaveValue("MOTEBEHOV_MELDT"));
    await waitFor(() => expect(select).toBeEnabled());
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("does not navigate when there is no landing page to return to", async () => {
    setRoute("/404", "/finnes-ikke");
    const { user } = render(<DemoBanner />);
    const select = screen.getByRole("combobox", { name: "Scenario" });
    await waitFor(() => expect(select).toBeEnabled());

    await user.selectOptions(select, "MOTEBEHOV_MELDT");

    await waitFor(() => expect(select).toHaveValue("MOTEBEHOV_MELDT"));
    await waitFor(() => expect(select).toBeEnabled());
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("keeps the warning visible and disables selection while loading", () => {
    fetch.mockImplementation(() => new Promise<Response>(() => {}));
    render(<DemoBanner />);

    expect(screen.getByRole("combobox", { name: "Scenario" })).toBeDisabled();
    expect(screen.getByText(/Dette er en demoside/)).toBeInTheDocument();
  });

  it("shows an accessible error when loading the active scenario fails", async () => {
    fetch.mockImplementation(async () => new Response(null, { status: 500 }));
    render(<DemoBanner />);

    await screen.findByText(
      "Kunne ikke hente scenario. Prøv å laste siden på nytt.",
    );
    const select = screen.getByRole("combobox", { name: "Scenario" });
    expect(select).toBeDisabled();
    expect(select).toHaveAccessibleDescription(
      "Kunne ikke hente scenario. Prøv å laste siden på nytt.",
    );
  });

  it("keeps the active selection and permits retry after a failed mutation", async () => {
    fetch.mockImplementation(async (_url, init) =>
      init?.method === "POST"
        ? new Response(null, { status: 500 })
        : Response.json("MELD_BEHOV"),
    );
    const { user } = render(<DemoBanner />);
    const select = screen.getByRole("combobox", { name: "Scenario" });
    await waitFor(() => expect(select).toBeEnabled());

    await user.selectOptions(select, "MOTEBEHOV_MELDT");

    await screen.findByText("Kunne ikke bytte scenario. Prøv igjen.");
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(select).toBeEnabled();
    expect(select).toHaveValue("MELD_BEHOV");
    expect(select).toHaveAccessibleDescription(
      "Kunne ikke bytte scenario. Prøv igjen.",
    );
  });

  it("has a keyboard-focusable labelled select and no axe violations", async () => {
    const { container, user } = render(<DemoBanner />);
    const select = screen.getByRole("combobox", { name: "Scenario" });
    await waitFor(() => expect(select).toBeEnabled());

    await user.tab();

    expect(select).toHaveFocus();
    expect(await axe(container)).toHaveNoViolations();
  });
});
