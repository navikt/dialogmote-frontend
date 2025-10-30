"use client";

import Script from "next/script";
import React from "react";

export function UmamiScript() {
  return (
    <Script
      defer
      src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
      strategy="afterInteractive"
      data-host-url="https://umami.nav.no"
      data-website-id="c44a6db3-c974-4316-b433-214f87e80b4d"
    />
  );
}
