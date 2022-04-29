import React from "react";
import { UseQueryResult } from "react-query";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { AvlystMoteinnkalling } from "@/common/components/moteinnkalling/AvlystMoteinnkalling";
import { PaagaaendeMoteinnkalling } from "@/common/components/moteinnkalling/PaagaaendeMoteinnkalling";
import { DialogmoteData } from "@/server/data/types/internal/DialogmoteType";
import {
  FeatureToggle,
  useFeatureToggles,
} from "@/common/api/queries/featureFlagsQuery";

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
  const featureToggles = useFeatureToggles();

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
          hideHeader={true}
          isLoading={dialogmoteData.isLoading}
        >
          <AvlystMoteinnkalling moteinnkalling={moteinnkalling} />
        </DialogmotePage>
      );
    }

    const getRandomVariantBasedOnDate = (date: string) =>
      (new Date(date).getTime() ?? 0) % 2 === 1;

    const secondVariantCondition =
      !!featureToggles.data?.[FeatureToggle.DialogmoteSvarABTest] &&
      getRandomVariantBasedOnDate(moteinnkalling.createdAt);

    return (
      <DialogmotePage
        title={
          moteinnkalling.brevType === "INNKALT"
            ? texts.titleInnkalling
            : texts.titleEndring
        }
        hideHeader={true}
        isLoading={dialogmoteData.isLoading || featureToggles.isLoading}
      >
        <PaagaaendeMoteinnkalling
          moteinnkalling={moteinnkalling}
          secondVariant={secondVariantCondition}
        />
      </DialogmotePage>
    );
  }
  return null;
};
