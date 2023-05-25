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

export const createDialogmoteAG = (
  props?: Partial<DialogmoteData>
): DialogmoteData => {
  return {
    referater: [],
    sykmeldt: sykmeldtFixture,
    ...props,
  };
};
