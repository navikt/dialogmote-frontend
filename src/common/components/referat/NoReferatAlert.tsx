import { LocalAlert } from "@navikt/ds-react";

const texts = {
  noReferat: "Vi finner ikke dette referatet.",
};

const NoReferatAlert = () => (
  <LocalAlert status="error">
    <LocalAlert.Content>{texts.noReferat}</LocalAlert.Content>
  </LocalAlert>
);

export default NoReferatAlert;
