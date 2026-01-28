import type { Brev } from "types/shared/brev";
import DocumentContainer from "@/common/components/document/DocumentContainer";

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
