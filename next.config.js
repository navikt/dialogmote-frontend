/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  basePath: "/syk/dialogmoter",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || null,
  pageExtensions: ["page.tsx", "page.ts", "page.js", "api.ts"],
  output: "standalone",
  productionBrowserSourceMaps: true,
};

module.exports = moduleExports;
