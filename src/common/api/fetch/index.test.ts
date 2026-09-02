import { afterEach, describe, expect, it, vi } from "vitest";
import { FetchNetworkError, FetchResponseParseError } from "./errors";
import { get } from "./index";

const leaderId = "leader_ref_9KLMNOP";
const endpoint = `/syk/dialogmoter/api/arbeidsgiver/${leaderId}?fnr=01017012345`;
const normalizedEndpoint =
  "/syk/dialogmoter/api/arbeidsgiver/{narmestelederid}";

describe("safe fetch errors", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("kaster HTTP-feil uten rå URL, statusText eller responsbody", async () => {
    const responseBody = "backend body ola-nordmann 975289753";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(responseBody, {
          status: 500,
          statusText: "Secret upstream detail",
        }),
      ),
    );

    const error = await get(endpoint).catch((caught) => caught as Error);

    expect(error).toBeInstanceOf(Error);
    if (!(error instanceof Error)) throw new Error("Expected Error");
    expect(error.message).toBe(
      `Request failed: method=GET endpoint=${normalizedEndpoint} status=500`,
    );
    expect(error.message).not.toMatch(
      /leader_ref|01017012345|ola-nordmann|975289753|Secret upstream detail/,
    );
  });

  it("kaster en normalisert nettverksfeil", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error(`Failed for ${leaderId}`)),
    );

    await expect(get(endpoint)).rejects.toEqual(
      expect.objectContaining({
        failureReason: "network",
        name: new FetchNetworkError().name,
        message: `Network request failed: method=GET endpoint=${normalizedEndpoint}`,
      }),
    );
  });

  it("bevarer AbortError uten å gjøre den om til en nettverksfeil", async () => {
    const abortError = new DOMException(
      `Request avbrutt for ${leaderId}`,
      "AbortError",
    );
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(abortError));

    const error = await get(endpoint).catch((caught) => caught);

    expect(error).toBe(abortError);
    expect(error).toEqual(
      expect.objectContaining({
        name: "AbortError",
      }),
    );
  });

  it("kaster en normalisert parsefeil uten responsinnhold", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response("ola-nordmann 01017012345", { status: 200 }),
        ),
    );

    await expect(get(endpoint)).rejects.toEqual(
      expect.objectContaining({
        failureReason: "invalid_json",
        name: new FetchResponseParseError().name,
        message: `Response parsing failed: method=GET endpoint=${normalizedEndpoint}`,
      }),
    );
  });

  it("skiller body-read-feil fra ugyldig JSON uten rå feildetaljer", async () => {
    const response = new Response(undefined, { status: 200 });
    vi.spyOn(response, "text").mockRejectedValue(
      new Error(`Kunne ikke lese ola-nordmann 01017012345 fra ${endpoint}`),
    );
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    const error = await get(endpoint).catch((caught) => caught as Error);

    expect(error).toEqual(
      expect.objectContaining({
        failureReason: "body_read",
        name: new FetchResponseParseError().name,
        message: `Response parsing failed: method=GET endpoint=${normalizedEndpoint}`,
      }),
    );
    expect(JSON.stringify(error)).not.toMatch(
      /leader_ref|01017012345|ola-nordmann/,
    );
  });

  it("bevarer AbortError som oppstår under lesing av responsbody", async () => {
    const abortError = new DOMException(
      `Lesing avbrutt for ola-nordmann 01017012345`,
      "AbortError",
    );
    const response = new Response(undefined, { status: 200 });
    vi.spyOn(response, "text").mockRejectedValue(abortError);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    const error = await get(endpoint).catch((caught) => caught);

    expect(error).toBe(abortError);
  });
});
