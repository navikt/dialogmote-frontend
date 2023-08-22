import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import NextLink from "next/link";
import React from "react";
import { Button } from "@navikt/ds-react";

const texts = {
  button: "Åpne som pdf",
};

interface Props {
  trackingName: Events;
  pdfUrl: string;
}

const DownloadPdfButton = ({ trackingName, pdfUrl }: Props) => {
  const { trackEvent } = useAmplitude();
  return (
    <div className="mb-8">
      <NextLink href={pdfUrl} passHref>
        <Button
          onClick={() => {
            trackEvent(trackingName);
          }}
        >
          {texts.button}
        </Button>
      </NextLink>
    </div>
  );
};

export default DownloadPdfButton;
