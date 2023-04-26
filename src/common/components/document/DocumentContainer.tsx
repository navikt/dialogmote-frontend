import { Heading } from "@navikt/ds-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import DocumentRenderer from "@/common/components/document/DocumentRenderer";
import { useMutateBrevLest } from "@/common/api/queries/brevQueries";
import { DocumentComponent } from "types/client/brev";
import { ReferatDocumentComponent } from "types/shared/brev";

const DocumentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 4px;
  background-color: white;
  white-space: pre-wrap;
  margin-bottom: 2rem;
`;
interface DocumentContainerProps {
  title: string;
  document: DocumentComponent[] | ReferatDocumentComponent[];
  className?: string;
  children?: React.ReactNode;
  lestDato?: string | null;
  brevUuid: string;
}

const DocumentContainer = ({
  title,
  document,
  lestDato,
  brevUuid,
  className,
  children,
}: DocumentContainerProps) => {
  const { mutate } = useMutateBrevLest();

  useEffect(() => {
    if (!lestDato) {
      mutate(brevUuid);
    }
  }, [brevUuid, lestDato, mutate]);

  const isLegacyHeader = document[0]?.type !== "HEADER_H1";

  return (
    <DocumentWrapperStyled className={className}>
      {isLegacyHeader && (
        <Heading size="xlarge" level="1">
          {title}
        </Heading>
      )}
      {document.map((documentComponent, index) => (
        <section key={index}>
          <DocumentRenderer documentComponent={documentComponent} />
        </section>
      ))}
      {children}
    </DocumentWrapperStyled>
  );
};

export default DocumentContainer;
