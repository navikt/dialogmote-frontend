import React from "react";
import { DocumentComponent } from "@/server/data/types/external/BrevTypes";
import { BodyLong, Heading, Label, Link } from "@navikt/ds-react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";

interface Props {
  documentComponent: DocumentComponent;
}

const DocumentRenderer = ({ documentComponent }: Props) => {
  const { type, title, texts } = documentComponent;
  const { trackEvent } = useAmplitude();

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

    case "LINK":
      return (
        <>
          {title && <Label spacing>{title}</Label>}
          {texts.map((text, index) => (
            <Link
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
          {title && <Label spacing>{title}</Label>}
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
