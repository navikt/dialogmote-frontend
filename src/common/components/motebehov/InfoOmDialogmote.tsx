import { BodyLong } from "@navikt/ds-react";
import React from "react";

const texts = {
  text1: `I et dialogmøte oppsummerer vi hva som har skjedd mens du har vært sykmeldt, og vi planlegger veien videre. De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg.`,
};

export const InfoOmDialogmote = () => {
  return (
    <>
      <BodyLong>{texts.text1}</BodyLong>
    </>
  );
};
