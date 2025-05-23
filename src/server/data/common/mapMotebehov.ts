import {
  MotebehovDataDTO,
  MotebehovStatusDTO,
} from "@/server/service/schema/motebehovSchema";
import { Motebehov, MotebehovSvar } from "types/shared/motebehov";

const mapMotebehovSvar = (
  motebehovData: MotebehovDataDTO | null
): MotebehovSvar | null => {
  if (!motebehovData) return null;

  return {
    harMotebehov: motebehovData.formValues.harMotebehov,
    formSnapshot: motebehovData.formValues.formSnapshot,
    opprettetDato: motebehovData.opprettetDato,
    virksomhetsnummer: motebehovData.virksomhetsnummer,
  };
};

export const mapMotebehov = (
  motebehovStatus: MotebehovStatusDTO,
  isLatestBrevOngoingMoteinnkalling: boolean
): Motebehov | undefined => {
  const displayMotebehov =
    motebehovStatus.visMotebehov && !isLatestBrevOngoingMoteinnkalling;

  if (displayMotebehov) {
    return {
      skjemaType: motebehovStatus.skjemaType,
      svar: mapMotebehovSvar(motebehovStatus.motebehovWithFormValues),
    };
  }

  return undefined;
};
