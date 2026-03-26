import { HttpResponse, http } from "msw";
import mockRouter from "next-router-mock";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DMErrorBoundary } from "@/common/components/error/DMErrorBoundary";
import Home from "@/pages/arbeidsgiver/[narmestelederid]/index.page";
import { testServer } from "../../../mocks/testServer";
import { render, screen } from "../../../test/testUtils";

vi.mock("next/legacy/image", () => ({
  default: () => null,
}));

describe("arbeidsgiver 404-flyt", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/arbeidsgiver?narmestelederid=123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("viser informasjonsmelding ved 404 fra sykmeldt-endepunktet", async () => {
    testServer.use(
      http.get("*/api/arbeidsgiver/*", () => {
        return HttpResponse.json(
          { error: "SYKMELDT_NOT_FOUND" },
          { status: 404 },
        );
      }),
    );

    render(<Home />);

    expect(
      await screen.findByRole("heading", { name: "Ingen aktiv sykmelding" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Gå til Dine sykmeldte" }),
    ).toHaveAttribute("href", "/arbeidsgiver/sykmeldte");
  });

  it("viser feilside ved andre HTTP-feil", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    testServer.use(
      http.get("*/api/arbeidsgiver/*", () => {
        return HttpResponse.json(
          { error: "INTERNAL_SERVER_ERROR" },
          { status: 500 },
        );
      }),
    );

    render(
      <DMErrorBoundary>
        <Home />
      </DMErrorBoundary>,
    );

    expect(
      await screen.findByRole("heading", { name: "Oops!" }),
    ).toBeInTheDocument();
  });

  it("viser feilside ved 404 fra andre tjenester", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    testServer.use(
      http.get("*/api/arbeidsgiver/*", () => {
        return HttpResponse.json(
          { error: "BREV_NOT_FOUND" },
          { status: 404 },
        );
      }),
    );

    render(
      <DMErrorBoundary>
        <Home />
      </DMErrorBoundary>,
    );

    expect(
      await screen.findByRole("heading", { name: "Oops!" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Ingen aktiv sykmelding" }),
    ).not.toBeInTheDocument();
  });
});
