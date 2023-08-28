import React from "react";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { AvlystMoteinnkalling } from "@/common/components/moteinnkalling/AvlystMoteinnkalling";
import { PaagaaendeMoteinnkalling } from "@/common/components/moteinnkalling/PaagaaendeMoteinnkalling";
import { Brev } from "../../../types/shared/brev";
import { Skeleton } from "@navikt/ds-react";

interface Props {
  isLoading: boolean;
  moteinnkalling?: Brev;
}

export const MoteinnkallingContent = ({ isLoading, moteinnkalling }: Props) => {
  if (isLoading) {
    return <Skeleton variant="rectangle" width="100%" height="75rem" />;
  }

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
