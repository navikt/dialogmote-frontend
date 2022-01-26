import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Download } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useAmp } from "next/amp";
import React from "react";
import styled from "styled-components";

const texts = {
  button: "Last ned PDF",
};

const ButtonStyled = styled(Button)`
  width: fit-content;
`;

interface Props {
  trackingName: Events;
}

const DownloadPdfButton = ({ trackingName }: Props) => {
  const { trackEvent } = useAmplitude();
  return (
    <ButtonStyled
      variant="secondary"
      onClick={() => {
        trackEvent(trackingName);
      }}
    >
      <Download />
      {texts.button}
    </ButtonStyled>
  );
};

export default DownloadPdfButton;
