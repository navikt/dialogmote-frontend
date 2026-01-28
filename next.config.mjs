/** @type {import('next').NextConfig} */
import cspHeader from "csp-header";

const environment =
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "prod" ? "prod" : "dev";

const CSP_SOURCES = {
  self: "'self'",
  uxSignals: "https://uxsignals-frontend.uxsignals.app.iterate.no",
};

const externalUrls = {
  prod: "https://www.nav.no/dekoratoren",
  dev: "https://dekoratoren.ekstern.dev.nav.no",
  beta: "https://dekoratoren-beta.intern.dev.nav.no",
  betaTms: "https://dekoratoren-beta-tms.intern.dev.nav.no",
};

const serviceUrls = {
  prod: "http://nav-dekoratoren.personbruker",
  dev: "http://nav-dekoratoren.personbruker",
  beta: "http://nav-dekoratoren-beta.personbruker",
  betaTms: "http://nav-dekoratoren-beta-tms.personbruker",
};

const naisGcpClusters = new Set(["dev-gcp", "prod-gcp"]);

const isNaisApp = () =>
  typeof process !== "undefined" &&
  process.env.NAIS_CLUSTER_NAME &&
  naisGcpClusters.has(process.env.NAIS_CLUSTER_NAME);

const getNaisUrl = (env, csr = false, serviceDiscovery = true) => {
  const shouldUseServiceDiscovery = serviceDiscovery && !csr && isNaisApp();
  return (
    (shouldUseServiceDiscovery ? serviceUrls[env] : externalUrls[env]) ||
    externalUrls.prod
  );
};

const decoratorCspApi = "/api/csp";
const fallbackDirectives = {
  "default-src": ["*", "data:", "blob:", "'unsafe-inline'", "'unsafe-eval'"],
};

const buildCspHeader = async (directives, envProps, retries = 3) => {
  const url = `${getNaisUrl(envProps.env, false, envProps.serviceDiscovery)}${decoratorCspApi}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((decoratorDirectives) =>
      cspHeader.getCSP({
        presets: [directives, decoratorDirectives],
      })
    )
    .catch((error) => {
      if (retries > 0) {
        return buildCspHeader(directives, envProps, retries - 1);
      }
      console.error(
        `Error fetching decorator CSP, using permissive fallback directives! - ${error}`
      );
      return cspHeader.getCSP({ directives: fallbackDirectives });
    });
};

const appDirectives = {
  "default-src": [CSP_SOURCES.self],
  "script-src": [CSP_SOURCES.self, "'unsafe-eval'", CSP_SOURCES.uxSignals],
  "script-src-elem": [CSP_SOURCES.self, CSP_SOURCES.uxSignals],
  "style-src": [CSP_SOURCES.self],
  "style-src-elem": [CSP_SOURCES.self, CSP_SOURCES.uxSignals],
  "img-src": [CSP_SOURCES.self, "data:"],
  "font-src": [CSP_SOURCES.self, "https://cdn.nav.no"],
  "worker-src": [CSP_SOURCES.self],
  "connect-src": [
    CSP_SOURCES.self,
    "https://*.nav.no",
    "https://*.uxsignals.com",
  ],
};

const moduleExports = {
  async headers() {
    const cspValue = await buildCspHeader(appDirectives, { env: environment });
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspValue,
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  basePath: "/syk/dialogmoter",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  pageExtensions: ["page.tsx", "page.ts", "page.js", "api.ts"],
  output: "standalone",
  productionBrowserSourceMaps: true,
  serverExternalPackages: [
    "@navikt/nav-dekoratoren-moduler",
    "@navikt/nav-dekoratoren-moduler/ssr",
  ],
  experimental: {
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
  },
};

export default moduleExports;
