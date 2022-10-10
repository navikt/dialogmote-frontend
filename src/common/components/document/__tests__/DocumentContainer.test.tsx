import { useMutateBrevLest } from "@/common/api/queries/brevQueries";
import { createDocumentComponent } from "../../../../tests/fixtures/brev";
import { render, screen } from "@testing-library/react";
import React from "react";
import DocumentContainer from "../DocumentContainer";

describe("DocumentContainer", () => {
  const mutateSpy = jest.fn();

  beforeEach(() => {
    (useMutateBrevLest as jest.Mock).mockReturnValue({
      mutate: mutateSpy,
      isLoading: false,
    });
  });

  afterEach(() => {
    mutateSpy.mockReset();
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

  test("should invoke mutation.mutate when lestDato is undefined", () => {
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

    expect(mutateSpy).toHaveBeenCalledWith("brev_uuid");
  });

  test("should not invoke mutation.mutate when lestDato is defined", () => {
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

    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
