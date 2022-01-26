import { Download } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";

const texts = {
  button: "Last ned PDF",
};

const ButtonStyled = styled(Button)`
  width: fit-content;
`;

const DownloadPdfButton = () => {
  return (
    <ButtonStyled variant="secondary">
      <Download />
      {texts.button}
    </ButtonStyled>
  );
};

export default DownloadPdfButton;
