import { beforeEach, describe, expect, it, vi } from "vitest";
import { brevSchema } from "./brevSchema";

const mocks = vi.hoisted(() => ({
  error: vi.fn(),
  warn: vi.fn(),
}));

vi.mock("@navikt/next-logger", () => ({
  logger: { error: mocks.error, warn: mocks.warn },
}));

describe("brevSchema unknown component values", () => {
  beforeEach(() => {
    mocks.error.mockReset();
    mocks.warn.mockReset();
  });

  it("beholder UNKNOWN-fallback og logger bare lukket WARN-metadata", () => {
    const unknownType = "secret-type-01017012345";
    const unknownKey = "secret-key-975289753";

    const parsed = brevSchema.safeParse({
      uuid: "safe-brev-id",
      deltakerUuid: "safe-deltaker-id",
      createdAt: "2026-08-31T12:00:00Z",
      brevType: "REFERAT",
      digitalt: true,
      lestDato: null,
      fritekst: "",
      sted: "",
      tid: "",
      videoLink: null,
      document: [
        {
          type: unknownType,
          key: unknownKey,
          title: null,
          texts: [],
        },
      ],
      virksomhetsnummer: "safe-orgnummer",
      svar: null,
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) throw parsed.error;
    expect(parsed.data.document[0]).toMatchObject({
      type: "UNKNOWN",
      key: "UNKNOWN",
    });
    expect(mocks.warn.mock.calls).toEqual([
      [
        {
          event_type: "dialogmote_brev_component_type_unknown",
          operation: "brev_component_normalize",
          error_code: "UNKNOWN_BREV_COMPONENT_TYPE",
          upstream: "isdialogmote",
        },
        "Unknown brev component type; using UNKNOWN fallback",
      ],
      [
        {
          event_type: "dialogmote_brev_document_key_unknown",
          operation: "brev_component_normalize",
          error_code: "UNKNOWN_BREV_DOCUMENT_KEY",
          upstream: "isdialogmote",
        },
        "Unknown brev document key; using UNKNOWN fallback",
      ],
    ]);
    expect(mocks.error).not.toHaveBeenCalled();
    expect(JSON.stringify(mocks.warn.mock.calls)).not.toMatch(
      /secret-type|secret-key|01017012345|975289753/,
    );
  });
});
