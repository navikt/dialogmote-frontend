import type { LumiSurveyDockProps } from "@navikt/lumi-survey";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSurveyTransport,
  DialogmoteSurvey,
} from "./DialogmoteSurveyInvitation";
import { dialogmoteSurvey, dialogmoteSurveyId } from "./dialogmoteSurvey";

const mocks = vi.hoisted(() => ({ get: vi.fn(), dock: vi.fn() }));
vi.mock("@/common/api/fetch", () => ({ get: mocks.get }));
vi.mock("next/router", () => ({
  useRouter: () => ({ basePath: "/syk/dialogmoter" }),
}));
vi.mock("@navikt/lumi-survey", () => ({
  LumiSurveyDock: (props: LumiSurveyDockProps) => {
    mocks.dock(props);
    return <div>Survey invitation</div>;
  },
}));

function renderSurvey() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <DialogmoteSurvey />
    </QueryClientProvider>,
  );
}

describe("DialogmoteSurvey", () => {
  beforeEach(() => {
    mocks.get.mockReset();
    mocks.dock.mockReset();
  });
  afterEach(() => vi.unstubAllGlobals());

  it("offers the shared document as a closed invitation without collecting the current person's URL", async () => {
    mocks.get.mockResolvedValue({ enabled: true });
    renderSurvey();
    await screen.findByText("Survey invitation");
    expect(mocks.get).toHaveBeenCalledWith("/syk/dialogmoter/api/lumi/config");
    expect(mocks.dock.mock.calls.at(-1)?.[0]).toEqual(
      expect.objectContaining({
        surveyId: dialogmoteSurveyId,
        survey: dialogmoteSurvey,
        behavior: {
          initialOpen: false,
          collectLocation: false,
          showProgress: true,
        },
        labels: { minimizedButton: "Del erfaringer med dialogmøte 1" },
        context: {
          tags: {
            role: "employer",
            page: "dialogmoter",
            revision: expect.any(String),
          },
        },
      }),
    );
  });

  it("keeps the invitation hidden when runtime configuration is disabled or unavailable", async () => {
    mocks.get.mockResolvedValue({ enabled: false });
    const first = renderSurvey();
    await waitFor(() => expect(mocks.get).toHaveBeenCalledOnce());
    expect(mocks.dock).not.toHaveBeenCalled();
    first.unmount();
    mocks.get.mockRejectedValue(new Error("Unavailable"));
    renderSurvey();
    await waitFor(() => expect(mocks.get).toHaveBeenCalledTimes(2));
    expect(mocks.dock).not.toHaveBeenCalled();
  });

  it("sends only the transport payload to the app's basePath and rejects failed submissions", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetch);
    const transport = createSurveyTransport("/syk/dialogmoter");
    const submission = {
      transportPayload: { surveyId: dialogmoteSurveyId },
      context: { debug: "must-not-send" },
    };
    await transport.submit(
      submission as unknown as Parameters<typeof transport.submit>[0],
    );
    expect(fetch).toHaveBeenCalledWith("/syk/dialogmoter/api/lumi/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission.transportPayload),
    });
    fetch.mockResolvedValue(new Response(null, { status: 503 }));
    await expect(
      transport.submit(
        submission as unknown as Parameters<typeof transport.submit>[0],
      ),
    ).rejects.toThrow("503");
  });
});
