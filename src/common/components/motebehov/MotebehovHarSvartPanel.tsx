import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { BodyLong } from "@navikt/ds-react";
import React, { ReactNode } from "react";
import { Motebehov } from "types/shared/motebehov";
import Receipt from "@/common/components/motebehov/receipt/Receipt";

interface Props {
  motebehov?: Motebehov;
  children?: ReactNode;
}

const texts = {
  svarJaTitle: "Du har svart at dere har behov for et dialogmøte",
  svarNeiTitle: "Du har svart at dere ikke har behov for et dialogmøte",
  meldTitle: "Du har bedt om et dialogmøte med Nav",
  textSvart:
    "Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte.",
};

export const MotebehovHarSvartPanel = ({ motebehov, children }: Props) => {
  if (motebehov?.svar) {
    return (
      <DialogmotePanel title={texts.svarNeiTitle}>
        <BodyLong>{texts.textSvart}</BodyLong>

        <Receipt motebehov={motebehov} />

        {children}
      </DialogmotePanel>
    );
  }
  return null;
};
