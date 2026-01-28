import { BodyLong, Heading, Link } from "@navikt/ds-react";
import type { DocumentComponent } from "types/client/brev";
import type { ReferatDocumentComponent } from "types/shared/brev";
import { Events } from "@/common/analytics/events";
import { useAnalytics } from "@/common/hooks/useAnalytics";

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
            <Heading
              size="xlarge"
              level="1"
              key={`header-${index}-${title ?? ""}`}
            >
              {text}
            </Heading>
          ))}
        </>
      );

    case "HEADER_H1":
      return (
        <>
          {texts.map((text, index) => (
            <Heading
              size="xlarge"
              level="1"
              key={`header-h1-${index}-${title ?? ""}`}
            >
              {text}
            </Heading>
          ))}
        </>
      );

    case "HEADER_H2":
      return (
        <>
          {texts.map((text, index) => (
            <Heading
              size="large"
              level="2"
              key={`header-h2-${index}-${title ?? ""}`}
            >
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
              key={`link-${text}`}
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
            <Heading size="xsmall" level="2" spacing>
              {title}
            </Heading>
          )}
          {texts.map((text, index) => (
            <BodyLong key={`paragraph-${index}-${title ?? ""}`}>
              {text}
            </BodyLong>
          ))}
        </>
      );

    default:
      return null;
  }
};

export default DocumentRenderer;
