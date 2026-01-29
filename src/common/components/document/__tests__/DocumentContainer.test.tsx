import { waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import mockRouter from "next-router-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createDocumentComponent } from "../../../../mocks/data/factories/brev";
import { testServer } from "../../../../mocks/testServer";
import { render, screen } from "../../../../test/testUtils";
import DocumentContainer from "../DocumentContainer";

describe("DocumentContainer", () => {
  const requestResolver = vi.fn();

  beforeEach(() => {
    mockRouter.setCurrentUrl("/sykmeldt");
    requestResolver.mockReset();

    testServer.use(
      http.post("*/api/sykmeldt/brev/brev_uuid/lest", async () => {
        requestResolver();
        return new HttpResponse(null, { status: 200 });
      }),
    );
  });

  it("should render", () => {
    const document = [
      createDocumentComponent({ texts: ["test-text-1"] }),
      createDocumentComponent(),
    ];

    render(
      <DocumentContainer
        document={document}
        brevUuid="brev_uuid"
        title="Test_title"
      >
        <div>Test div</div>
      </DocumentContainer>,
    );

    expect(screen.getByText("test-text-1")).toBeInTheDocument();
  });

  it("should render with legacy header", () => {
    const document = [
      createDocumentComponent({ type: "PARAGRAPH" }),
      createDocumentComponent(),
    ];

    render(
      <DocumentContainer
        document={document}
        brevUuid="brev_uuid"
        title="Test_title"
      >
        <div>Test div</div>
      </DocumentContainer>,
    );

    expect(screen.getByText("Test_title")).toBeInTheDocument();
  });

  it("should invoke mutation.mutate when lestDato is undefined", async () => {
    const document = [createDocumentComponent(), createDocumentComponent()];

    render(
      <DocumentContainer
        document={document}
        brevUuid="brev_uuid"
        title="Test_title"
      >
        <div>Test div</div>
      </DocumentContainer>,
    );

    await waitFor(() => {
      expect(requestResolver).toHaveBeenCalledTimes(1);
    });
  });

  it("should not invoke mutation.mutate when lestDato is defined", async () => {
    const document = [createDocumentComponent(), createDocumentComponent()];

    render(
      <DocumentContainer
        document={document}
        brevUuid="brev_uuid"
        lestDato="date"
        title="Test_title"
      >
        <div>Test div</div>
      </DocumentContainer>,
    );

    await waitFor(() => {
      expect(requestResolver).not.toHaveBeenCalled();
    });
  });
});
