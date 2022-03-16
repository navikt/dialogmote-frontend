import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { AvlystMoteinnkalling } from "@/common/components/moteinnkalling/AvlystMoteinnkalling";
import { PaagaaendeMoteinnkalling } from "@/common/components/moteinnkalling/PaagaaendeMoteinnkalling";
import React from "react";
import { UseQueryResult } from "react-query";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";

const texts = {
  noMeetingFound: "Vi finner ikke din møteinnkalling.",
  titleAvlysning: "Avlysning av dialogmøte",
  titleEndring: "Endret dialogmøte",
  titleInnkalling: "Innkalling til dialogmøte",
};

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
}

export const MoteinnkallingContent = ({ dialogmoteData }: Props) => {
  if (dialogmoteData.isSuccess) {
    const moteinnkalling = dialogmoteData.data.moteinnkalling;

    if (moteinnkalling === undefined) {
      return (
        <ErrorWithEscapeRoute>{texts.noMeetingFound}</ErrorWithEscapeRoute>
      );
    }

    if (moteinnkalling.brevType === "AVLYST") {
      return (
        <DialogmotePage
          title={texts.titleAvlysning}
          isLoading={dialogmoteData.isLoading}
        >
          <AvlystMoteinnkalling moteinnkalling={moteinnkalling} />
        </DialogmotePage>
      );
    }

    return (
      <DialogmotePage
        title={
          moteinnkalling.brevType === "INNKALT"
            ? texts.titleInnkalling
            : texts.titleEndring
        }
        isLoading={dialogmoteData.isLoading}
      >
        <PaagaaendeMoteinnkalling moteinnkalling={moteinnkalling} />
      </DialogmotePage>
    );
  }
  return null;
};
