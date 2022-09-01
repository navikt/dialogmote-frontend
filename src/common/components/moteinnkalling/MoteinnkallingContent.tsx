import React from "react";
import { UseQueryResult } from "react-query";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { AvlystMoteinnkalling } from "@/common/components/moteinnkalling/AvlystMoteinnkalling";
import { PaagaaendeMoteinnkalling } from "@/common/components/moteinnkalling/PaagaaendeMoteinnkalling";
import { DialogmoteData } from "types/shared/dialogmote";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";

const texts = {
  noMeetingFound: "Vi finner ikke din møteinnkalling.",
  titleAvlysning: "Avlysning av dialogmøte",
  titleEndring: "Endret dialogmøte",
  titleInnkalling: "Innkalling til dialogmøte",
};

interface Props {
  dialogmoteData: UseQueryResult<DialogmoteData>;
  userType: "AG" | "SM";
}

export const MoteinnkallingContent = ({ dialogmoteData, userType }: Props) => {
  if (dialogmoteData.isSuccess) {
    const moteinnkalling = dialogmoteData.data.moteinnkalling;

    if (moteinnkalling === undefined) {
      return (
        <PageContainer header={false}>
          <ErrorWithEscapeRoute>{texts.noMeetingFound}</ErrorWithEscapeRoute>
        </PageContainer>
      );
    }

    const additionalContainerProps =
      userType === "AG"
        ? {
            withAGHeader: true,
            sykmeldt: dialogmoteData.data?.sykmeldt,
          }
        : {};

    if (moteinnkalling.brevType === "AVLYST") {
      return (
        <DialogmotePage
          title={texts.titleAvlysning}
          hideTitle={true}
          isLoading={dialogmoteData.isLoading}
          {...additionalContainerProps}
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
        hideTitle={true}
        isLoading={dialogmoteData.isLoading}
        {...additionalContainerProps}
      >
        <PaagaaendeMoteinnkalling moteinnkalling={moteinnkalling} />
      </DialogmotePage>
    );
  }
  return null;
};
