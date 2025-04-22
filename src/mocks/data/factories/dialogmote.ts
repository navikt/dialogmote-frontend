import { DialogmoteData } from "../../../types/shared/dialogmote";
import { sykmeldtFixture } from "../fixtures/sykmeldt";

export const createDialogmoteSM = (
  props?: Partial<DialogmoteData>
): DialogmoteData => {
  return {
    referater: [],
    ...props,
  };
};

export const createSvarBehovSM = (
  props?: Partial<DialogmoteData>
): DialogmoteData => {
  return {
    referater: [],
    motebehov: {
      skjemaType: "SVAR_BEHOV",
      svar: null,
    },
    ...props,
  };
};

export const createDialogmoteAG = (
  props?: Partial<DialogmoteData>
): DialogmoteData => {
  return {
    referater: [],
    sykmeldt: sykmeldtFixture,
    ...props,
  };
};

export const createSvarBehovAG = (
  props?: Partial<DialogmoteData>
): DialogmoteData => {
  return {
    referater: [],
    motebehov: {
      skjemaType: "SVAR_BEHOV",
      svar: null,
    },
    ...props,
  };
};
