import { Radio, RadioGroup } from "@navikt/ds-react";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

const texts = {
  radioTitle: "Har dere behov for et møte med NAV?",
  radioJa: "Ja, jeg mener det er behov for et møte",
  radioNei: "Nei, jeg mener det ikke er behov for et møte",
};

interface Props {
  id: string;
  error: ReactNode;
  clearErrors: () => void;
  setBehovForMote: Dispatch<SetStateAction<boolean | null>>;
}

export const SvarBehovRadioGroup = ({
  id,
  setBehovForMote,
  error,
  clearErrors,
}: Props) => {
  return (
    <RadioGroup legend={texts.radioTitle} size="medium" error={error}>
      <Radio
        id={id}
        value="Ja"
        onChange={() => {
          clearErrors();
          setBehovForMote(true);
        }}
      >
        {texts.radioJa}
      </Radio>
      <Radio
        value="Nei"
        onChange={() => {
          clearErrors();
          setBehovForMote(false);
        }}
      >
        {texts.radioNei}
      </Radio>
    </RadioGroup>
  );
};
