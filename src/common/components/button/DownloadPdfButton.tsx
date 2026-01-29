import { Button } from "@navikt/ds-react";
import NextLink from "next/link";
import type { Events } from "@/common/analytics/events";
import { useAnalytics } from "@/common/hooks/useAnalytics";

const texts = {
  button: "Åpne som pdf",
};

interface Props {
  trackingName: Events;
  pdfUrl: string;
}

const DownloadPdfButton = ({ trackingName, pdfUrl }: Props) => {
  const { trackEvent } = useAnalytics();
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
