import { Brev } from "@/server/data/types/external/BrevTypes";
import PageHeader from "@/common/components/PageHeader";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import React from "react";
import { Tilbakeknapp } from "@/common/components/button/Tilbakeknapp";

interface Props {
  moteinnkalling: Brev;
}

const texts = {
  title: "Avlysning av dialogmøte",
};

export const AvlystMoteinnkalling = ({ moteinnkalling }: Props) => {
  return (
    <>
      <PageHeader title={texts.title} />
      <DocumentContainer
        document={moteinnkalling.document}
        brevUuid={moteinnkalling.uuid}
        lestDato={moteinnkalling.lestDato}
      />
      <Tilbakeknapp />
    </>
  );
};
