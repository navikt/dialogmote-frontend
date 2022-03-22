import { Brev } from "@/server/data/types/external/BrevTypes";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import React from "react";

const texts = {
  titleAvlysning: "Avlysning av dialogmøte",
};

interface Props {
  moteinnkalling: Brev;
}

export const AvlystMoteinnkalling = ({ moteinnkalling }: Props) => {
  return (
    <DocumentContainer
      title={texts.titleAvlysning}
      document={moteinnkalling.document}
      brevUuid={moteinnkalling.uuid}
      lestDato={moteinnkalling.lestDato}
    />
  );
};
