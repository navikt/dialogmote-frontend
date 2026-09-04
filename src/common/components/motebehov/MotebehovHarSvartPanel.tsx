import { BodyLong } from "@navikt/ds-react";
import type { ReactNode } from "react";
import Receipt from "@/common/components/motebehov/receipt/Receipt";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import type {
  MotebehovSkjemaType,
  MotebehovSvar,
} from "@/types/shared/motebehov";

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
    throw new Error("Motebehov response is missing formSnapshot");
  }

  return (
    <DialogmotePanel title={panelTitle}>
      <BodyLong>{texts.textSvart}</BodyLong>

      <Receipt opprettetDato={opprettetDato} formSnapshot={formSnapshot} />

      {children}
    </DialogmotePanel>
  );
};
