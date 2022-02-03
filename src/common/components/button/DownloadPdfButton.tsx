import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Download } from "@navikt/ds-icons";
import React from "react";
import Link from "next/link";
import styled from "styled-components";

const texts = {
  button: "Åpne som pdf",
};

const ButtonStyled = styled.a`
  width: fit-content;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

interface Props {
  trackingName: Events;
  pdfUrl: string;
}

const DownloadPdfButton = ({ trackingName, pdfUrl }: Props) => {
  const { trackEvent } = useAmplitude();
  return (
    <Link href={pdfUrl}>
      <ButtonStyled
        onClick={() => {
          trackEvent(trackingName);
        }}
        className="navds-button navds-button--secondary navds-button--medium"
      >
        <Download />
        {texts.button}
      </ButtonStyled>
    </Link>
  );
};

export default DownloadPdfButton;
