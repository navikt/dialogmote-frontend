import { BodyLong, GuidePanel, Heading, Link } from "@navikt/ds-react";
import React from "react";

const IngenSykmeldingInfo = () => {
  return (
    <GuidePanel poster>
      <Heading level="1" size="medium" spacing>
        Ingen aktiv sykmelding
      </Heading>
      <BodyLong spacing>
        Den ansatte har ikke en aktiv sykmelding, og dialogmøteinformasjon er
        derfor ikke tilgjengelig.
      </BodyLong>
      <BodyLong>
        <Link href="/arbeidsgiver/sykmeldte">Gå til Dine sykmeldte</Link>
      </BodyLong>
    </GuidePanel>
  );
};

export default IngenSykmeldingInfo;
