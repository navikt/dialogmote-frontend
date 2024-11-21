import { useErrorSummaryFormatter } from "./useErrorSummaryFormatter";
import { FieldErrors } from "react-hook-form";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useErrorSummaryFormatter", () => {
  it("should format FieldErrors to ErrorValues", () => {
    const fieldErrors: FieldErrors = {
      field1: {
        type: "required",
        message: "error at field 1",
      },
      field2: undefined,
    };
    const { result } = renderHook(() => useErrorSummaryFormatter(fieldErrors));
    const formatted = result.current;

    expect(formatted).toStrictEqual([
      { href: "#field1", text: "error at field 1" },
    ]);
  });
});
