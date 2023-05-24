import { createDocumentComponent } from "../../../../mocks/data/factories/brev";
import DocumentContainer from "../DocumentContainer";
import { render, screen } from "../../../../test/testUtils";
import { waitFor } from "@testing-library/react";
import { testServer } from "../../../../mocks/testServer";
import { rest } from "msw";
import mockRouter from "next-router-mock";

describe("DocumentContainer", () => {
  const requestResolver = jest.fn();

  beforeEach(() => {
    mockRouter.setCurrentUrl("/sykmeldt");
    requestResolver.mockRestore();

    testServer.use(
      rest.post("/api/sykmeldt/brev/brev_uuid/lest", async (_req, res, ctx) => {
        requestResolver();
        return res(ctx.status(200));
      })
    );
  });

  test("should render", () => {
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
      </DocumentContainer>
    );

    expect(screen.getByText("test-text-1")).toBeInTheDocument();
  });

  test("should render with legacy header", () => {
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
      </DocumentContainer>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test_title"
    );
  });

  test("should invoke mutation.mutate when lestDato is undefined", async () => {
    const document = [createDocumentComponent(), createDocumentComponent()];

    render(
      <DocumentContainer
        document={document}
        brevUuid="brev_uuid"
        title="Test_title"
      >
        <div>Test div</div>
      </DocumentContainer>
    );

    await waitFor(() => {
      expect(requestResolver).toHaveBeenCalledTimes(1);
    });
  });

  test("should not invoke mutation.mutate when lestDato is defined", async () => {
    const document = [createDocumentComponent(), createDocumentComponent()];

    render(
      <DocumentContainer
        document={document}
        brevUuid="brev_uuid"
        lestDato="date"
        title="Test_title"
      >
        <div>Test div</div>
      </DocumentContainer>
    );

    await waitFor(() => {
      expect(requestResolver).not.toHaveBeenCalled();
    });
  });
});
