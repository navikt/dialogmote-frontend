import { getNaisMetaTags } from "@nais/apm";

export const getDialogmoteApmMetaTags = () =>
  getNaisMetaTags({
    app: "dialogmote-frontend",
    namespace: "team-esyfo",
    version: process.env.NEXT_PUBLIC_VERSION,
    // Never bake the coarse build environment into the shared image. Dynamic
    // renders can read NAIS_CLUSTER_NAME; static pages use the browser's exact
    // ingress allowlist when APM initializes.
    telemetryUrl: process.env.NEXT_PUBLIC_TELEMETRY_URL,
  });
