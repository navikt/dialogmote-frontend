import { Alert } from "@navikt/ds-react";
import React from "react";

const texts = {
  noReferat: "Vi finner ikke dette referatet.",
};

const NoReferatAlert = () => {
  return <Alert variant="error">{texts.noReferat}</Alert>;
};

export default NoReferatAlert;
