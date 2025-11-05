import React from "react";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { Events } from "@/common/analytics/events";
import { DocumentComponent } from "types/client/brev";
import { ReferatDocumentComponent } from "types/shared/brev";

interface Props {
  documentComponent: DocumentComponent | ReferatDocumentComponent;
}

const DocumentRenderer = ({ documentComponent }: Props) => {
  const { type, title, texts } = documentComponent;
  const { trackEvent } = useAnalytics();

  switch (type) {
    case "HEADER":
      return (
        <>
          {texts.map((text, index) => (
            <Heading size="xlarge" level="1" key={index}>
              {text}
            </Heading>
          ))}
        </>
      );

    case "HEADER_H1":
      return (
        <>
          {texts.map((text, index) => (
            <Heading size="xlarge" level="1" key={index}>
              {text}
            </Heading>
          ))}
        </>
      );

    case "HEADER_H2":
      return (
        <>
          {texts.map((text, index) => (
            <Heading size="large" level="2" key={index}>
              {text}
            </Heading>
          ))}
        </>
      );

    case "LINK":
      return (
        <>
          {title && (
            <Heading size="xsmall" level="3" spacing>
              {title}
            </Heading>
          )}
          {texts.map((text, index) => (
            <Link
              className="break-words"
              key={index}
              href={text}
              onClick={() =>
                trackEvent(Events.DocumentRendererLink, { linkType: text })
              }
            >
              {text}
            </Link>
          ))}
        </>
      );

    case "PARAGRAPH":
      return (
        <>
          {title && (
            <Heading size="xsmall" level="3" spacing>
              {title}
            </Heading>
          )}
          {texts.map((text, index) => (
            <BodyLong key={index}>{text}</BodyLong>
          ))}
        </>
      );

    default:
      return null;
  }
};

export default DocumentRenderer;
