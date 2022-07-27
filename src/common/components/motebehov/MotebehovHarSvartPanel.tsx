import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { BodyLong } from "@navikt/ds-react";
import { MotebehovSvarAccordion } from "@/common/components/motebehov/MotebehovSvarAccordion";
import React, { ReactNode } from "react";
import { Motebehov } from "types/shared/motebehov";

interface Props {
  motebehov?: Motebehov;
  children?: ReactNode;
}

const texts = {
  titleKvittering: "Du har svart på om du ønsker et møte",
  textSvart:
    "Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte.",
};

export const MotebehovHarSvartPanel = ({ motebehov, children }: Props) => {
  if (motebehov?.svar) {
    return (
      <DialogmotePanel title={texts.titleKvittering}>
        <BodyLong>{texts.textSvart}</BodyLong>

        <MotebehovSvarAccordion motebehov={motebehov} />

        {children}
      </DialogmotePanel>
    );
  }
  return null;
};
