import { beforeEach, describe, expect, it } from "vitest";
import {
  BROWSER_APM_APP,
  BROWSER_APM_NAMESPACE,
  BROWSER_BASE_PATH,
  browserApmOptions,
  browserApmOptionsFor,
  normalizeTelemetryEndpoint,
  pageIdFromBrowserPath,
  resolveBrowserCluster,
  sanitizeBrowserTelemetry,
  UNKNOWN_ENDPOINT,
  UNKNOWN_PAGE_ID,
} from "./browser";
import { setCurrentBrowserPage } from "./routes";

const leaderId = "leader_ref_9KLMNOP";
const letterId = "0eda3772-1cab-482e-be5f-c18387cd8709";
const employerReferencePage = `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}/referat/{brevuuid}`;

describe("browser routes", () => {
  it.each([
    ["/", BROWSER_BASE_PATH],
    ["/sykmeldt", `${BROWSER_BASE_PATH}/sykmeldt`],
    [
      "/sykmeldt/motebehov/meld",
      `${BROWSER_BASE_PATH}/sykmeldt/motebehov/meld`,
    ],
    [
      "/sykmeldt/referat/[brevuuid]",
      `${BROWSER_BASE_PATH}/sykmeldt/referat/{brevuuid}`,
    ],
    [
      "/arbeidsgiver/[narmestelederid]/motebehov/svar",
      `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}/motebehov/svar`,
    ],
    [
      "/arbeidsgiver/[narmestelederid]/referat/[brevuuid]",
      employerReferencePage,
    ],
  ])("mapper Next-ruten %s", (pathname, expected) => {
    expect(setCurrentBrowserPage(pathname)).toBe(expected);
  });

  it("feiler lukket for ukjente Next-ruter", () => {
    expect(setCurrentBrowserPage("/ukjent/[id]")).toBe(UNKNOWN_PAGE_ID);
  });

  it("normaliserer den fysiske browserruten før React hydration", () => {
    expect(
      pageIdFromBrowserPath(
        `${BROWSER_BASE_PATH}/arbeidsgiver/${leaderId}/referat/${letterId}`,
      ),
    ).toBe(employerReferencePage);
    expect(
      pageIdFromBrowserPath(`${BROWSER_BASE_PATH}/ukjent/${leaderId}`),
    ).toBe(UNKNOWN_PAGE_ID);
    expect(pageIdFromBrowserPath(`/arbeidsgiver/${leaderId}`)).toBe(
      UNKNOWN_PAGE_ID,
    );
  });
});

describe("safe fetch endpoints", () => {
  it.each([
    [
      `${BROWSER_BASE_PATH}/api/arbeidsgiver/${leaderId}?fnr=skjult`,
      `${BROWSER_BASE_PATH}/api/arbeidsgiver/{narmestelederid}`,
    ],
    [
      `/api/sykmeldt/brev/${letterId}/svar`,
      `${BROWSER_BASE_PATH}/api/sykmeldt/brev/{uuid}/svar`,
    ],
    [
      "/api/arbeidsgiver/motebehov",
      `${BROWSER_BASE_PATH}/api/arbeidsgiver/motebehov`,
    ],
    [
      `https://dinesykmeldte-backend/api/v2/dinesykmeldte/${leaderId}`,
      "/api/v2/dinesykmeldte/{narmestelederid}",
    ],
    [
      `https://isdialogmote/api/v2/narmesteleder/brev/${letterId}/respons`,
      "/api/v2/narmesteleder/brev/{uuid}/respons",
    ],
    [
      "https://syfomotebehov/syfomotebehov/api/v4/arbeidstaker/motebehov/ferdigstill/",
      "/syfomotebehov/api/v4/arbeidstaker/motebehov/ferdigstill",
    ],
  ])("normaliserer %s", (value, expected) => {
    expect(normalizeTelemetryEndpoint(value)).toBe(expected);
  });

  it("skjuler ukjente endepunkter", () => {
    expect(
      normalizeTelemetryEndpoint("https://example.com/person/hemmelig"),
    ).toBe(UNKNOWN_ENDPOINT);
  });
});

describe("browser cluster", () => {
  it.each([
    ["www.nav.no", "prod-gcp"],
    ["WWW.NAV.NO", "prod-gcp"],
    ["www.ekstern.dev.nav.no", "dev-gcp"],
    ["demo.ekstern.dev.nav.no", undefined],
    ["preview.www.nav.no", undefined],
    ["www.nav.no.example.com", undefined],
    ["localhost", undefined],
  ])("løser bare eksakt allowlistet ingress %s", (hostname, expected) => {
    expect(resolveBrowserCluster(hostname)).toBe(expected);
  });

  it("sender cluster eksplisitt til APM bare for kjente ingresser", () => {
    expect(browserApmOptionsFor("www.ekstern.dev.nav.no")).toMatchObject({
      environment: "dev-gcp",
    });
    expect(browserApmOptionsFor("demo.ekstern.dev.nav.no")).not.toHaveProperty(
      "environment",
    );
  });
});

describe("browser telemetry contract", () => {
  beforeEach(() => {
    setCurrentBrowserPage("/arbeidsgiver/[narmestelederid]/referat/[brevuuid]");
  });

  it("bruker den allowlistede Next-ruten i page-meta", () => {
    const raw = {
      type: "event",
      payload: { name: "route_change", attributes: {} },
      meta: {
        user: { id: "leder@nav.no" },
        page: {
          id: `${BROWSER_BASE_PATH}/arbeidsgiver/${leaderId}/referat/${letterId}`,
          url: `https://leder:hemmelig@www.nav.no${BROWSER_BASE_PATH}/arbeidsgiver/${leaderId}/referat/${letterId}?fnr=skjult`,
        },
      },
    } as Parameters<typeof sanitizeBrowserTelemetry>[0];

    const sanitized = sanitizeBrowserTelemetry(raw);

    expect(sanitized?.meta.user).toBeUndefined();
    expect(sanitized?.meta.page).toEqual({
      id: employerReferencePage,
      url: `https://www.nav.no${employerReferencePage}`,
    });
    expect(raw.meta.page?.url).toContain(leaderId);
  });

  it("kanoniserer performance-navigation og dropper rå navigasjon", () => {
    const navigation = sanitizeBrowserTelemetry({
      type: "event",
      payload: {
        name: "faro.performance.navigation",
        attributes: {
          name: `https://www.nav.no${BROWSER_BASE_PATH}/arbeidsgiver/${leaderId}?fnr=skjult`,
        },
      },
      meta: {},
    } as Parameters<typeof sanitizeBrowserTelemetry>[0]);

    expect(navigation?.payload).toEqual(
      expect.objectContaining({
        attributes: {
          name: `https://www.nav.no${employerReferencePage}`,
        },
      }),
    );
    expect(
      sanitizeBrowserTelemetry({
        type: "event",
        payload: {
          name: "faro.navigation",
          attributes: {
            fromUrl: `/arbeidsgiver/${leaderId}`,
            toUrl: `/arbeidsgiver/${leaderId}/referat/${letterId}?fnr=skjult`,
          },
        },
        meta: {},
      } as Parameters<typeof sanitizeBrowserTelemetry>[0]),
    ).toBeNull();
  });

  it("beholder bare trygge strukturelle felt fra CSP-rapporter", () => {
    const sensitiveUri =
      "https://www.nav.no/arbeidsgiver/01017012345?token=hemmelig";
    const sanitized = sanitizeBrowserTelemetry({
      type: "event",
      payload: {
        name: "securitypolicyviolation",
        attributes: {
          blockedURI: sensitiveUri,
          disposition: "enforce",
          documentURI: sensitiveUri,
          effectiveDirective: "script-src-elem",
          originalPolicy: `script-src ${sensitiveUri}`,
          referrer: sensitiveUri,
          sample: "ola-nordmann 01017012345",
          sourceFile: sensitiveUri,
          statusCode: "200",
          violatedDirective: `script-src-elem ${sensitiveUri}`,
        },
      },
      meta: {},
    } as Parameters<typeof sanitizeBrowserTelemetry>[0]);

    expect(sanitized?.payload).toEqual({
      name: "securitypolicyviolation",
      attributes: {
        directive: "script-src-elem",
        disposition: "enforce",
        status_code: "200",
      },
    });
    expect(JSON.stringify(sanitized)).not.toMatch(
      /blockedURI|documentURI|sourceFile|sample|01017012345|hemmelig|ola-nordmann/,
    );
  });

  it("lukker ugyldige strukturelle CSP-verdier", () => {
    const sanitized = sanitizeBrowserTelemetry({
      type: "event",
      payload: {
        name: "securitypolicyviolation",
        attributes: {
          effectiveDirective: "script-src ola-nordmann@example.com",
          disposition: "01017012345",
          statusCode: "https://www.nav.no/person/01017012345",
        },
      },
      meta: {},
    } as Parameters<typeof sanitizeBrowserTelemetry>[0]);

    expect(sanitized?.payload).toEqual({
      name: "securitypolicyviolation",
      attributes: {
        directive: "unknown",
        disposition: "unknown",
        status_code: "unknown",
      },
    });
    expect(JSON.stringify(sanitized)).not.toMatch(
      /ola-nordmann|01017012345|www\.nav\.no/,
    );
  });

  it("skjuler rute-ID-er i feil og beholder trygge Next-chunks", () => {
    const chunkUrl =
      "https://cdn.nav.no/team-esyfo/dialogmote-frontend/_next/static/chunks/pages/app-abc123.js";
    const sanitized = sanitizeBrowserTelemetry({
      type: "exception",
      payload: {
        type: "Error",
        value: `Render failed at https://www.nav.no${BROWSER_BASE_PATH}/arbeidsgiver/${leaderId}/referat/${letterId}?fnr=skjult correlation=${letterId}`,
        stacktrace: {
          frames: [
            { filename: `${chunkUrl}?token=skjult:12:34` },
            {
              filename: `https://www.nav.no${BROWSER_BASE_PATH}/arbeidsgiver/${leaderId}`,
            },
          ],
        },
      },
      meta: {},
    } as Parameters<typeof sanitizeBrowserTelemetry>[0]);

    expect(sanitized).not.toBeNull();
    if (!sanitized) throw new Error("Expected exception telemetry");
    const payload = sanitized.payload as {
      value: string;
      stacktrace: { frames: Array<{ filename: string }> };
    };

    expect(payload.value).toBe(
      `Render failed at ${employerReferencePage} correlation={uuid}`,
    );
    expect(payload.stacktrace.frames.map(({ filename }) => filename)).toEqual([
      `${chunkUrl}:12:34`,
      employerReferencePage,
    ]);
  });

  it("beholder et normalisert API-endepunkt uten å legge til sidens base path på nytt", () => {
    setCurrentBrowserPage("/arbeidsgiver/[narmestelederid]");
    const rawLeaderUuid = letterId;
    const normalizedEndpoint = `${BROWSER_BASE_PATH}/api/arbeidsgiver/{narmestelederid}`;
    const sanitized = sanitizeBrowserTelemetry({
      type: "exception",
      payload: {
        type: "Error",
        value: `Request failed: method=GET endpoint=${normalizedEndpoint} status=500`,
      },
      meta: {
        page: {
          id: `${BROWSER_BASE_PATH}/arbeidsgiver/${rawLeaderUuid}`,
          url: `https://www.ekstern.dev.nav.no${BROWSER_BASE_PATH}/arbeidsgiver/${rawLeaderUuid}?fnr=skjult`,
        },
      },
    } as Parameters<typeof sanitizeBrowserTelemetry>[0]);

    expect(sanitized).not.toBeNull();
    if (!sanitized) throw new Error("Expected exception telemetry");
    expect(sanitized.payload).toEqual(
      expect.objectContaining({
        value: `Request failed: method=GET endpoint=${normalizedEndpoint} status=500`,
      }),
    );
    expect(sanitized.meta.page).toEqual({
      id: `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}`,
      url: `https://www.ekstern.dev.nav.no${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}`,
    });
    expect(JSON.stringify(sanitized)).not.toContain(rawLeaderUuid);
    expect(JSON.stringify(sanitized)).not.toMatch(/fnr=|skjult/);
  });

  it("fjerner DOM-targets fra Web Vitals", () => {
    const sanitized = sanitizeBrowserTelemetry({
      type: "measurement",
      payload: {
        type: "web-vitals",
        values: { lcp: 800 },
        context: {
          id: "v6-1725033600000-1234567890123",
          rating: "good",
          element: `#leder-${leaderId}`,
          interaction_target: `#brev-${letterId}`,
          largest_shift_target: ".personkort",
        },
      },
      meta: {},
    } as Parameters<typeof sanitizeBrowserTelemetry>[0]);

    expect(sanitized?.payload).toEqual(
      expect.objectContaining({
        context: { id: "v6-1725033600000-1234567890123", rating: "good" },
      }),
    );
  });

  it("konfigurerer bare appens avvik fra APM-defaultene", () => {
    expect(browserApmOptions).toMatchObject({
      app: BROWSER_APM_APP,
      namespace: BROWSER_APM_NAMESPACE,
      devConsoleEcho: false,
      faro: {
        trackResources: false,
        webVitalsInstrumentation: { trackAttributionSources: false },
      },
    });
    expect(browserApmOptions.tracing).toBe(true);
    expect(browserApmOptions).not.toHaveProperty("sessionReplay");
    expect(browserApmOptions).not.toHaveProperty("screenshotOnError");
  });
});
