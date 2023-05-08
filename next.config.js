/** @type {import('next').NextConfig} */

const basePath = "/syk/dialogmoter";

const moduleExports = {
  reactStrictMode: true,
  basePath,
  publicRuntimeConfig: {
    dineSykemeldteRoot: process.env.DINE_SYKMELDTE_ROOT,
    dittSykefravarRoot: process.env.DITT_SYKEFRAVAER_ROOT,
    minSideRoot: process.env.MIN_SIDE_ROOT,
    displayTestScenarioSelector: process.env.DISPLAY_TESTSCENARIO_SELECTOR,
    basePath,
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.js", "api.ts"],
};

module.exports = moduleExports;
