import {
  Motebehov,
  MotebehovStatus,
} from "@/server/data/types/external/MotebehovTypes";
import {
  DialogMotebehov,
  DialogMotebehovSvar,
} from "@/server/data/types/internal/DialogMotebehovTypes";

const mapDialogmoteBehovSvar = (
  motebehovSvar: Motebehov | null | undefined
): DialogMotebehovSvar | undefined => {
  if (!motebehovSvar) return undefined;

  return {
    harMotebehov: motebehovSvar.motebehovSvar.harMotebehov,
    forklaring: motebehovSvar.motebehovSvar.forklaring,
    opprettetDato: motebehovSvar.opprettetDato,
    virksomhetsnummer: motebehovSvar.virksomhetsnummer,
  };
};

export const mapDialogmotebehov = (
  motebehovStatus: MotebehovStatus,
  isLatestBrevOngoingMoteinnkalling: boolean
): DialogMotebehov | undefined => {
  const displayMotebehov =
    motebehovStatus.visMotebehov && !isLatestBrevOngoingMoteinnkalling;

  if (displayMotebehov) {
    return {
      skjemaType: motebehovStatus.skjemaType,
      svar: mapDialogmoteBehovSvar(motebehovStatus.motebehov),
    };
  }

  return undefined;
};
