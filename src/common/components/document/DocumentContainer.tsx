import { Heading } from "@navikt/ds-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import { DocumentComponent } from "@/server/data/types/external/BrevTypes";
import DocumentRenderer from "@/common/components/document/DocumentRenderer";
import { useMutateBrevLest } from "@/common/api/queries/brevQueries";

const DocumentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 4px;
  padding: 2rem;
  background-color: white;
  white-space: pre-wrap;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

interface DocumentContainerProps {
  title: string;
  document: DocumentComponent[];
  className?: string;
  children?: React.ReactNode;
  lestDato?: string;
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
  const mutation = useMutateBrevLest();

  useEffect(() => {
    if (!lestDato && !mutation.isLoading) {
      mutation.mutate(brevUuid);
    }
  }, [brevUuid, lestDato, mutation]);

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
