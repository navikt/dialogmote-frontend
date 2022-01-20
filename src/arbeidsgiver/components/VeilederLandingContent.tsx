import React, { ReactElement } from "react";
import Lenke from "nav-frontend-lenker";
import { DIALOGMOTE_INFO_URL } from "@/common/constants/staticPaths";

const texts = {
  veileder:
    "I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, arbeidstakeren og en veileder fra NAV-kontoret, eventuelt også den som sykmelder arbeidstakeren. ",
  veilederUrl: "Les mer om dialogmøter",
};

const VeilederLandingContent = (): ReactElement => {
  return (
    <React.Fragment>
      {texts.veileder}
      <br />
      <Lenke href={DIALOGMOTE_INFO_URL} target="_blank">
        {texts.veilederUrl}
      </Lenke>
    </React.Fragment>
  );
};

export default VeilederLandingContent;
