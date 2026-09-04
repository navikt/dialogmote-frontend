import {
  captureException,
  type InitOptions,
  init,
  isInitialized,
  isLocalHost,
  pushEvent,
} from "@nais/apm";
import { getFetchFailureReason, isAbortError } from "@/common/api/fetch/errors";
import { isDemoOrLocal } from "@/common/publicEnv";
import { HttpError } from "@/common/utils/errors/HttpError";
import { BROWSER_BASE_PATH, getCurrentBrowserPage } from "./routes";

export {
  BROWSER_BASE_PATH,
  normalizeTelemetryEndpoint,
  pageIdFromBrowserPath,
  UNKNOWN_ENDPOINT,
  UNKNOWN_PAGE_ID,
} from "./routes";

export const BROWSER_APM_APP = "dialogmote-frontend";
export const BROWSER_APM_NAMESPACE = "team-esyfo";

type BrowserCluster = "dev-gcp" | "prod-gcp";

const BROWSER_CLUSTER_BY_INGRESS: Readonly<Record<string, BrowserCluster>> = {
  "www.ekstern.dev.nav.no": "dev-gcp",
  "www.nav.no": "prod-gcp",
};

/** Resolve environment only from this app's exact, production-owned ingresses. */
export const resolveBrowserCluster = (
  hostname: string,
): BrowserCluster | undefined =>
  BROWSER_CLUSTER_BY_INGRESS[hostname.toLowerCase()];

const BROWSER_ROUTE_REFERENCE =
  /(?<![A-Za-z0-9_./-])(?:https?:\/\/(?:[\w-]+\.)*nav\.no)?\/(?:syk\/dialogmoter\/)?(?:arbeidsgiver|sykmeldt)\/[^\s"'<>)]*/gi;
const UUID = /\b[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\b/gi;
const SAFE_CHUNK_PATHS = [
  "/_next/static/chunks/",
  `${BROWSER_BASE_PATH}/_next/static/chunks/`,
  "/team-esyfo/dialogmote-frontend/_next/static/chunks/",
] as const;
const WEB_VITAL_DOM_FIELDS = [
  "element",
  "interaction_target",
  "largest_shift_target",
] as const;
const CSP_DIRECTIVE = /^[a-z][a-z0-9-]{0,63}$/;
const CSP_DISPOSITIONS = new Set(["enforce", "report"]);
const CSP_STATUS_CODE = /^(?:0|[1-5]\d{2})$/;
const UNKNOWN_CSP_VALUE = "unknown";

type Payload = {
  name?: string;
  attributes?: Record<string, string>;
  value?: string;
  type?: string;
  context?: Record<string, string>;
  stacktrace?: {
    frames: Array<{ filename: string } & Record<string, unknown>>;
  } & Record<string, unknown>;
};

const canonicalPageUrl = (value: string, pageId: string): string => {
  try {
    const url = new URL(value);
    const isNavHost =
      url.hostname === "nav.no" || url.hostname.endsWith(".nav.no");
    return isNavHost && ["http:", "https:"].includes(url.protocol)
      ? `${url.origin}${pageId}`
      : pageId;
  } catch {
    return pageId;
  }
};

const canonicalStackFrame = (value: string, pageId: string): string => {
  const match = value.match(/^(.*):(\d+):(\d+)$/);
  const candidate = match?.[1] ?? value;
  const position = match ? `:${match[2]}:${match[3]}` : "";
  const relativePath = candidate.split(/[?#]/, 1)[0];
  if (SAFE_CHUNK_PATHS.some((prefix) => relativePath.startsWith(prefix))) {
    return `${relativePath}${position}`;
  }
  try {
    const url = new URL(candidate);
    const isNavHost =
      url.hostname === "nav.no" || url.hostname.endsWith(".nav.no");
    if (
      isNavHost &&
      SAFE_CHUNK_PATHS.some((prefix) => url.pathname.startsWith(prefix))
    ) {
      return `${url.origin}${url.pathname}${position}`;
    }
  } catch {
    // Fall through to the current allowlisted page.
  }
  return pageId;
};

type BeforeSend = NonNullable<InitOptions["beforeSend"]>;

const safeCspValue = (value: string | undefined, pattern: RegExp): string =>
  value !== undefined && pattern.test(value) ? value : UNKNOWN_CSP_VALUE;

const safeCspDisposition = (value: string | undefined): string =>
  value !== undefined && CSP_DISPOSITIONS.has(value)
    ? value
    : UNKNOWN_CSP_VALUE;

/** Normalize only the app-owned fields that the generic APM scrubber cannot know. */
export const sanitizeBrowserTelemetry: BeforeSend = (item) => {
  const pageId = getCurrentBrowserPage();
  const meta = { ...item.meta };
  delete meta.user;
  if (meta.page) {
    meta.page = {
      ...meta.page,
      id: pageId,
      url: canonicalPageUrl(meta.page.url ?? "", pageId),
    };
  }

  let payload = item.payload as Payload;
  if (item.type === "event") {
    if (payload.name === "securitypolicyviolation") {
      payload = {
        name: payload.name,
        attributes: {
          directive: safeCspValue(
            payload.attributes?.effectiveDirective,
            CSP_DIRECTIVE,
          ),
          disposition: safeCspDisposition(payload.attributes?.disposition),
          status_code: safeCspValue(
            payload.attributes?.statusCode,
            CSP_STATUS_CODE,
          ),
        },
      };
    } else if (payload.name === "faro.navigation") {
      return null;
    } else if (
      payload.name === "faro.performance.navigation" &&
      typeof payload.attributes?.name === "string"
    ) {
      payload = {
        ...payload,
        attributes: {
          ...payload.attributes,
          name: canonicalPageUrl(payload.attributes.name, pageId),
        },
      };
    }
  } else if (item.type === "exception") {
    payload = {
      ...payload,
      ...(payload.value === undefined
        ? {}
        : {
            value: payload.value
              .replace(BROWSER_ROUTE_REFERENCE, pageId)
              .replace(UUID, "{uuid}"),
          }),
      ...(payload.stacktrace
        ? {
            stacktrace: {
              ...payload.stacktrace,
              frames: payload.stacktrace.frames.map((frame) => ({
                ...frame,
                filename: canonicalStackFrame(frame.filename, pageId),
              })),
            },
          }
        : {}),
    };
  } else if (
    item.type === "measurement" &&
    payload.type === "web-vitals" &&
    payload.context
  ) {
    const context = { ...payload.context };
    for (const field of WEB_VITAL_DOM_FIELDS) delete context[field];
    payload = { ...payload, context };
  }

  return { ...item, payload: payload as typeof item.payload, meta };
};

export const browserApmOptions = {
  app: BROWSER_APM_APP,
  namespace: BROWSER_APM_NAMESPACE,
  beforeSend: sanitizeBrowserTelemetry,
  devConsoleEcho: false,
  tracing: true,
  faro: {
    trackResources: false,
    webVitalsInstrumentation: { trackAttributionSources: false },
  },
} satisfies InitOptions;

export const browserApmOptionsFor = (hostname: string): InitOptions => {
  const environment = resolveBrowserCluster(hostname);
  return {
    ...browserApmOptions,
    ...(environment ? { environment } : {}),
  };
};

export function initBrowserObservability() {
  if (typeof window === "undefined" || isDemoOrLocal || isLocalHost()) {
    return undefined;
  }
  return init(browserApmOptionsFor(window.location.hostname));
}

export function reportBrowserMutationError(error: unknown): void {
  if (
    !isInitialized() ||
    isAbortError(error) ||
    (error instanceof HttpError && error.code === 401)
  ) {
    return;
  }
  const failureReason = getFetchFailureReason(error);
  if (failureReason) {
    captureException(error, {
      context: { failure_reason: failureReason },
    });
    return;
  }
  captureException(error);
}

export function trackBrowserRoute(toRoute: string, fromRoute?: string): void {
  if (!isInitialized()) return;
  pushEvent("route_change", {
    toRoute,
    toUrl: toRoute,
    ...(fromRoute ? { fromRoute, fromUrl: fromRoute } : {}),
  });
}
