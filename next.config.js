/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: true,
  basePath: "/syk/poc/dialogmote",
  publicRuntimeConfig: {
    // Will be available on both server and client
    dittSykefravaerUrl: process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_ROOT,
    dineSykmeldteUrl: process.env.NEXT_PUBLIC_DINE_SYKMELDTE_ROOT,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
