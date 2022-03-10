import { Brev } from "@/server/data/types/external/BrevTypes";
import DocumentContainer from "@/common/components/document/DocumentContainer";
import React from "react";

interface Props {
  moteinnkalling: Brev;
}

export const AvlystMoteinnkalling = ({ moteinnkalling }: Props) => {
  return (
    <DocumentContainer
      document={moteinnkalling.document}
      brevUuid={moteinnkalling.uuid}
      lestDato={moteinnkalling.lestDato}
    />
  );
};
