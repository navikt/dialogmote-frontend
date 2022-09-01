import React from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";

function NotFound() {
  return (
    <PageContainer header={false}>
      <div>Fant ikke siden</div>
    </PageContainer>
  );
}

export default NotFound;
