/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  basePath: "/syk/dialogmoter",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  pageExtensions: ["page.tsx", "page.ts", "page.js", "api.ts"],
  output: "standalone",
  productionBrowserSourceMaps: true,
  experimental: {
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
  },
};

module.exports = moduleExports;
