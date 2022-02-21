import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import React, { Dispatch, SetStateAction } from "react";

const texts = {
  title: "Meld behov for møte",
};

interface Props {
  behovForMoteId: string;
  motebehovTekst: string;
  behandlerVaereMedTekst: string;
  error: string | undefined;
  setBehovForMote: Dispatch<SetStateAction<boolean | undefined>>;
  clearErrors: () => void;
  setBehandlerBliMed: Dispatch<SetStateAction<boolean | undefined>>;
}

export const MeldBehovCheckboxGroup = ({
  behovForMoteId,
  motebehovTekst,
  behandlerVaereMedTekst,
  error,
  setBehovForMote,
  clearErrors,
  setBehandlerBliMed,
}: Props) => {
  return (
    <CheckboxGroup size="medium" legend={texts.title} hideLegend>
      <Checkbox
        id={behovForMoteId}
        value={behovForMoteId}
        onChange={(e) => {
          clearErrors();
          setBehovForMote(e.target.checked);
        }}
        error={!!error}
      >
        {motebehovTekst}
      </Checkbox>
      <Checkbox
        value="BehandlerVaereMed"
        onChange={(e) => setBehandlerBliMed(e.target.checked)}
      >
        {behandlerVaereMedTekst}
      </Checkbox>
    </CheckboxGroup>
  );
};
