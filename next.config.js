/** @type {import('next').NextConfig} */

const environment =
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "prod" ? "prod" : "dev";

const CSP_SOURCES = {
  self: "'self'",
  uxSignals: "https://uxsignals-frontend.uxsignals.app.iterate.no",
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
    const { buildCspHeader } = await import(
      "@navikt/nav-dekoratoren-moduler/ssr/index.js"
    );
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
  serverExternalPackages: ["@navikt/nav-dekoratoren-moduler", "jsdom"],
  experimental: {
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
  },
};

module.exports = moduleExports;
