import { Box, Heading } from "@navikt/ds-react";
import { type ReactNode, useEffect } from "react";
import type { DocumentComponent } from "types/client/brev";
import type { ReferatDocumentComponent } from "types/shared/brev";
import { useMutateBrevLest } from "@/common/api/queries/brevQueries";
import DocumentRenderer from "@/common/components/document/DocumentRenderer";

interface DocumentContainerProps {
  title: string;
  document: DocumentComponent[] | ReferatDocumentComponent[];
  children?: ReactNode;
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

  const getDocumentComponentKey = (
    documentComponent: DocumentComponent | ReferatDocumentComponent,
  ) => {
    return [
      documentComponent.type,
      documentComponent.title ?? "",
      documentComponent.texts.join("|"),
    ].join("|");
  };

  return (
    <Box
      className="flex flex-col gap-8 whitespace-pre-wrap p-8 mb-8"
      background="default"
      borderWidth="1"
      borderColor="neutral-subtle"
      borderRadius="8"
    >
      {isLegacyHeader && (
        <Heading size="xlarge" level="1">
          {title}
        </Heading>
      )}
      {document.map((documentComponent) => (
        <section key={getDocumentComponentKey(documentComponent)}>
          <DocumentRenderer documentComponent={documentComponent} />
        </section>
      ))}
      {children}
    </Box>
  );
};

export default DocumentContainer;
