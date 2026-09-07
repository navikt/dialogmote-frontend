import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import Home from "./index.page";

const mocks = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock("@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG", () => ({
  useDialogmoteDataAG: mocks.query,
}));
vi.mock("@/common/components/lumi/DialogmoteSurveyInvitation", () => ({
  DialogmoteSurvey: () => <div>Survey invitation</div>,
}));
vi.mock("@/common/components/page/ArbeidsgiverSide", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@/common/components/motebehov/panel/MotebehovPanelAG", () => ({
  MotebehovPanelAG: () => null,
}));
vi.mock("@/common/components/moteinnkalling/MoteinnkallingPanel", () => ({
  default: () => null,
}));
vi.mock("@/common/components/referat/ReferaterPanel", () => ({
  default: () => null,
}));
vi.mock("@/common/components/referat/InfoTilArbeidsgiver", () => ({
  default: () => null,
}));
vi.mock("@/common/components/video/VideoPanel", () => ({
  default: () => null,
}));
vi.mock("@/common/components/personvern/PersonvernInfo", () => ({
  default: () => null,
}));

describe("employer overview survey placement", () => {
  it("waits for successful employer data and does not offer the survey during loading or failure", () => {
    mocks.query.mockReturnValue({ isLoading: true, isSuccess: false });
    const { rerender } = render(<Home />);
    expect(screen.queryByText("Survey invitation")).not.toBeInTheDocument();
    mocks.query.mockReturnValue({ isLoading: false, isSuccess: false });
    rerender(<Home />);
    expect(screen.queryByText("Survey invitation")).not.toBeInTheDocument();
    mocks.query.mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: { referater: [] },
    });
    rerender(<Home />);
    expect(screen.getByText("Survey invitation")).toBeInTheDocument();
  });
});
