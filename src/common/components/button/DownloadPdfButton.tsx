import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import { Button } from "@navikt/ds-react";

const texts = {
  button: "Åpne som pdf",
};

const MarginStyled = styled.div`
  margin-bottom: 2rem;
`;

interface Props {
  trackingName: Events;
  pdfUrl: string;
}

const DownloadPdfButton = ({ trackingName, pdfUrl }: Props) => {
  const { trackEvent } = useAmplitude();
  return (
    <MarginStyled>
      <NextLink href={pdfUrl} passHref>
        <Button
          as="a"
          onClick={() => {
            trackEvent(trackingName);
          }}
        >
          {texts.button}
        </Button>
      </NextLink>
    </MarginStyled>
  );
};

export default DownloadPdfButton;
