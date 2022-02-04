import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const texts = {
  button: "Åpne som pdf",
};

const ButtonStyled = styled.a`
  width: fit-content;
`;

interface Props {
  trackingName: Events;
  pdfUrl: string;
}

const DownloadPdfButton = ({ trackingName, pdfUrl }: Props) => {
  const { trackEvent } = useAmplitude();
  return (
    <Link href={pdfUrl} passHref={true}>
      <ButtonStyled
        onClick={() => {
          trackEvent(trackingName);
        }}
        className="navds-button navds-button--secondary navds-button--medium"
      >
        {texts.button}
      </ButtonStyled>
    </Link>
  );
};

export default DownloadPdfButton;
