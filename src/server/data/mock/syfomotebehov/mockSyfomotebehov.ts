import { MotebehovSkjemaType } from "@/common/api/types/motebehovTypes";
import {
  ingenMotebehov,
  motebehovStatusMeldBehov,
  motebehovStatusMeldBehovSvar,
  motebehovStatusSvarBehov,
  motebehovStatusSvarBehovSvar,
} from "@/server/data/mock/syfomotebehov/Motebehov/MotebehovStatuser";

export const mockSyfoMotebehov = (
  type: MotebehovSkjemaType,
  harSvart: boolean
) => {
  switch (type) {
    case "MELD_BEHOV": {
      if (harSvart) {
        return motebehovStatusMeldBehovSvar;
      }
      return motebehovStatusMeldBehov;
    }
    case "SVAR_BEHOV": {
      if (harSvart) {
        return motebehovStatusSvarBehovSvar;
      }
      return motebehovStatusSvarBehov;
    }
    default: {
      return ingenMotebehov;
    }
  }
};
