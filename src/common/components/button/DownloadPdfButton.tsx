import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";

const texts = {
  button: "Åpne som pdf",
};

const ButtonStyled = styled.a`
  width: fit-content;
`;

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
      <NextLink href={pdfUrl} passHref={true}>
        <ButtonStyled
          onClick={() => {
            trackEvent(trackingName);
          }}
          className="navds-button navds-button--secondary navds-button--medium"
        >
          {texts.button}
        </ButtonStyled>
      </NextLink>
    </MarginStyled>
  );
};

export default DownloadPdfButton;
