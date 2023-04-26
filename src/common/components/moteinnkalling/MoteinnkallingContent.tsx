import React from "react";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { AvlystMoteinnkalling } from "@/common/components/moteinnkalling/AvlystMoteinnkalling";
import { PaagaaendeMoteinnkalling } from "@/common/components/moteinnkalling/PaagaaendeMoteinnkalling";
import { Brev } from "../../../types/shared/brev";

interface Props {
  moteinnkalling?: Brev;
}

export const MoteinnkallingContent = ({ moteinnkalling }: Props) => {
  if (moteinnkalling === undefined) {
    return (
      <ErrorWithEscapeRoute>
        Vi finner ikke din møteinnkalling.
      </ErrorWithEscapeRoute>
    );
  }

  if (moteinnkalling.brevType === "AVLYST") {
    return <AvlystMoteinnkalling moteinnkalling={moteinnkalling} />;
  }

  return <PaagaaendeMoteinnkalling moteinnkalling={moteinnkalling} />;
};
