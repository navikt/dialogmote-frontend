import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { BodyLong } from "@navikt/ds-react";
import React, { ReactNode } from "react";
import { MotebehovSkjemaType, MotebehovSvar } from "types/shared/motebehov";
import Receipt from "@/common/components/motebehov/receipt/Receipt";
import { logger } from "@navikt/next-logger";

interface Props {
  motebehovSvar: MotebehovSvar;
  skjemaType: MotebehovSkjemaType;
  children?: ReactNode;
}

const texts = {
  svarJaTitle: "Du har svart at dere har behov for et dialogmøte",
  svarNeiTitle: "Du har svart at dere ikke har behov for et dialogmøte",
  meldTitle: "Du har bedt om et dialogmøte med Nav",
  textSvart:
    "Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte.",
};

export const MotebehovHarSvartPanel = ({
  motebehovSvar,
  skjemaType,
  children,
}: Props) => {
  const opprettetDato = motebehovSvar.opprettetDato;
  const formSnapshot = motebehovSvar.formSnapshot;

  const harMotebehovForSvarBehovSkjemaType = motebehovSvar.harMotebehov;

  const panelTitle =
    skjemaType === "MELD_BEHOV"
      ? texts.meldTitle
      : harMotebehovForSvarBehovSkjemaType
      ? texts.svarJaTitle
      : texts.svarNeiTitle;

  if (!formSnapshot) {
    logger.error(
      "MotebehovHarSvartPanel: formSnapshot is missing, this should not happen."
    );
    throw new Error(
      "Beklager, det oppstod en feil ved henting av svaret ditt."
    );
  }

  return (
    <DialogmotePanel title={panelTitle}>
      <BodyLong>{texts.textSvart}</BodyLong>

      <Receipt opprettetDato={opprettetDato} formSnapshot={formSnapshot} />

      {children}
    </DialogmotePanel>
  );
};
