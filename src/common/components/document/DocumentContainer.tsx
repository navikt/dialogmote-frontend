import { Heading, Panel } from "@navikt/ds-react";
import React, { useEffect } from "react";
import DocumentRenderer from "@/common/components/document/DocumentRenderer";
import { useMutateBrevLest } from "@/common/api/queries/brevQueries";
import { DocumentComponent } from "types/client/brev";
import { ReferatDocumentComponent } from "types/shared/brev";

interface DocumentContainerProps {
  title: string;
  document: DocumentComponent[] | ReferatDocumentComponent[];
  children?: React.ReactNode;
  lestDato?: string | null;
  brevUuid: string;
}

const DocumentContainer = ({
  title,
  document,
  lestDato,
  brevUuid,
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
    <Panel className="flex flex-col gap-8 bg-ds-gray-50 whitespace-pre-wrap p-8 mb-8">
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
    </Panel>
  );
};

export default DocumentContainer;
