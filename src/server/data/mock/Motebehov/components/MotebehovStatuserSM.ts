import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import {
  motebehovSvar,
  svarMotebehovSvar,
} from "@/server/data/mock/Motebehov/components/MotebehovSM";

export const motebehovStatusMeldBehov: MotebehovStatus = {
  visMotebehov: true,
  skjemaType: "MELD_BEHOV",
  motebehov: null,
};
export const motebehovStatusMeldBehovSvar: MotebehovStatus = {
  visMotebehov: true,
  skjemaType: "MELD_BEHOV",
  motebehov: motebehovSvar,
};

export const motebehovStatusSvarBehov: MotebehovStatus = {
  visMotebehov: true,
  skjemaType: "SVAR_BEHOV",
  motebehov: null,
};
export const motebehovStatusSvarBehovSvar: MotebehovStatus = {
  visMotebehov: true,
  skjemaType: "SVAR_BEHOV",
  motebehov: svarMotebehovSvar,
};

export const ingenMotebehov: MotebehovStatus = {
  visMotebehov: false,
  skjemaType: null,
  motebehov: null,
};
