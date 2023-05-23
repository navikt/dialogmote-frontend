import React from "react";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Events } from "@/common/amplitude/events";
import { DocumentComponent } from "types/client/brev";
import { ReferatDocumentComponent } from "types/shared/brev";
import styled from "styled-components";

interface Props {
  documentComponent: DocumentComponent | ReferatDocumentComponent;
}

const StyledLink = styled(Link)`
  word-break: break-word;
`;

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
            <StyledLink
              key={index}
              href={text}
              onClick={() =>
                trackEvent(Events.DocumentRendererLink, { linkType: text })
              }
            >
              {text}
            </StyledLink>
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
