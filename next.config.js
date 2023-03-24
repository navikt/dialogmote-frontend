/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

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
};

const sentryWebpackPluginOptions = {
  silent: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
