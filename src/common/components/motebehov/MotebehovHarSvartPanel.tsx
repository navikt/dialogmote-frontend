import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { BodyLong } from "@navikt/ds-react";
import React, { ReactNode } from "react";
import { Motebehov } from "types/shared/motebehov";
import Receipt from "@/common/components/motebehov/receipt/Receipt";
import { logger } from "@navikt/next-logger";

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
    const opprettetDato = motebehov.svar.opprettetDato;
    const formSnapshot = motebehov.svar.formSnapshot;

    if (!formSnapshot) {
      logger.error(
        "MotebehovHarSvartPanel: formSnapshot is missing, this should not happen."
      );
      throw new Error(
        "Beklager, det oppstod en feil ved henting av svaret ditt."
      );
    }

    return (
      <DialogmotePanel title={texts.svarNeiTitle}>
        <BodyLong>{texts.textSvart}</BodyLong>

        <Receipt opprettetDato={opprettetDato} formSnapshot={formSnapshot} />

        {children}
      </DialogmotePanel>
    );
  }
  return null;
};
