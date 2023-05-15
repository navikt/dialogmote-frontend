import { DialogmoteData } from "../../../types/shared/dialogmote";

export const createDialogmote = (
  props?: Partial<DialogmoteData>
): DialogmoteData => {
  return {
    referater: [],
    ...props,
  };
};
