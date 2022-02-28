import {
  ExtMotebehov,
  ExtMotebehovStatus,
} from "@/server/data/types/external/ExternalMotebehovTypes";
import {
  Motebehov,
  MotebehovSvar,
} from "@/server/data/types/internal/MotebehovTypes";

const mapMotebehovSvar = (
  motebehovSvar: ExtMotebehov | null | undefined
): MotebehovSvar | undefined => {
  if (!motebehovSvar) return undefined;

  return {
    harMotebehov: motebehovSvar.motebehovSvar.harMotebehov,
    forklaring: motebehovSvar.motebehovSvar.forklaring,
    opprettetDato: motebehovSvar.opprettetDato,
    virksomhetsnummer: motebehovSvar.virksomhetsnummer,
  };
};

export const mapMotebehov = (
  motebehovStatus: ExtMotebehovStatus,
  isLatestBrevOngoingMoteinnkalling: boolean
): Motebehov | undefined => {
  const displayMotebehov =
    motebehovStatus.visMotebehov && !isLatestBrevOngoingMoteinnkalling;

  if (displayMotebehov && motebehovStatus.skjemaType) {
    return {
      skjemaType: motebehovStatus.skjemaType,
      svar: mapMotebehovSvar(motebehovStatus.motebehov),
    };
  }

  return undefined;
};
