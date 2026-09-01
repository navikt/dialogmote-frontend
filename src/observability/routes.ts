export const BROWSER_BASE_PATH = "/syk/dialogmoter";
export const UNKNOWN_PAGE_ID = `${BROWSER_BASE_PATH}/{unknown}`;
export const UNKNOWN_ENDPOINT = "/{unknown}";

const PAGE_IDS: Readonly<Record<string, string>> = {
  "/": BROWSER_BASE_PATH,
  "/sykmeldt": `${BROWSER_BASE_PATH}/sykmeldt`,
  "/sykmeldt/motebehov/meld": `${BROWSER_BASE_PATH}/sykmeldt/motebehov/meld`,
  "/sykmeldt/motebehov/svar": `${BROWSER_BASE_PATH}/sykmeldt/motebehov/svar`,
  "/sykmeldt/moteinnkalling": `${BROWSER_BASE_PATH}/sykmeldt/moteinnkalling`,
  "/sykmeldt/referat/[brevuuid]": `${BROWSER_BASE_PATH}/sykmeldt/referat/{brevuuid}`,
  "/arbeidsgiver/[narmestelederid]": `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}`,
  "/arbeidsgiver/[narmestelederid]/motebehov/meld": `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}/motebehov/meld`,
  "/arbeidsgiver/[narmestelederid]/motebehov/svar": `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}/motebehov/svar`,
  "/arbeidsgiver/[narmestelederid]/moteinnkalling": `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}/moteinnkalling`,
  "/arbeidsgiver/[narmestelederid]/referat/[brevuuid]": `${BROWSER_BASE_PATH}/arbeidsgiver/{narmestelederid}/referat/{brevuuid}`,
};

let currentPageId = UNKNOWN_PAGE_ID;

export function setCurrentBrowserPage(nextPathname: string): string {
  currentPageId = PAGE_IDS[nextPathname] ?? UNKNOWN_PAGE_ID;
  return currentPageId;
}

export const getCurrentBrowserPage = (): string => currentPageId;

type EndpointRoute = readonly [pattern: RegExp, canonicalPath: string];

const endpointRoutes: readonly EndpointRoute[] = [
  [
    /^\/api\/(arbeidsgiver|sykmeldt)\/motebehov\/?$/,
    `${BROWSER_BASE_PATH}/api/$1/motebehov`,
  ],
  [
    /^\/api\/arbeidsgiver\/[^/]+\/?$/,
    `${BROWSER_BASE_PATH}/api/arbeidsgiver/{narmestelederid}`,
  ],
  [
    /^\/api\/(arbeidsgiver|sykmeldt)\/brev\/[^/]+\/(lest|pdf|svar)\/?$/,
    `${BROWSER_BASE_PATH}/api/$1/brev/{uuid}/$2`,
  ],
  [
    /^\/api\/sykmeldt\/motebehov\/ferdigstill\/?$/,
    `${BROWSER_BASE_PATH}/api/sykmeldt/motebehov/ferdigstill`,
  ],
  [
    /^\/api\/(sykmeldt|features|isAlive|isReady|logger)\/?$/,
    `${BROWSER_BASE_PATH}/api/$1`,
  ],
  [
    /^\/api\/scenario\/activescenario\/?$/,
    `${BROWSER_BASE_PATH}/api/scenario/activescenario`,
  ],
  [
    /^\/api\/v2\/dinesykmeldte\/[^/]+\/?$/,
    "/api/v2/dinesykmeldte/{narmestelederid}",
  ],
  [/^\/api\/v2\/(narmesteleder|arbeidstaker)\/brev\/?$/, "/api/v2/$1/brev"],
  [
    /^\/api\/v2\/(narmesteleder|arbeidstaker)\/brev\/[^/]+\/(les|respons|pdf)\/?$/,
    "/api/v2/$1/brev/{uuid}/$2",
  ],
  [
    /^\/syfomotebehov\/api\/v4\/(arbeidstaker\/)?motebehov(\/ferdigstill)?\/?$/,
    "/syfomotebehov/api/v4/$1motebehov$2",
  ],
];

const pathnameFrom = (value: string): string => {
  try {
    return new URL(value, "https://telemetry.invalid").pathname;
  } catch {
    return "/";
  }
};

const withoutBasePath = (pathname: string): string => {
  if (pathname === BROWSER_BASE_PATH) return "/";
  return pathname.startsWith(`${BROWSER_BASE_PATH}/`)
    ? pathname.slice(BROWSER_BASE_PATH.length)
    : pathname;
};

export function normalizeTelemetryEndpoint(value: string): string {
  const pathname = withoutBasePath(pathnameFrom(value));
  for (const [pattern, replacement] of endpointRoutes) {
    if (pattern.test(pathname)) return pathname.replace(pattern, replacement);
  }
  return UNKNOWN_ENDPOINT;
}
