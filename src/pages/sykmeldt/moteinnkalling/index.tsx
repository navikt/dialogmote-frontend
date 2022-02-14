import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { AvlystMoteinnkalling } from "@/common/components/moteinnkalling/AvlystMoteinnkalling";
import { PaagaaendeMoteinnkalling } from "@/common/components/moteinnkalling/PaagaaendeMoteinnkalling";

const texts = {
  noMeetingFound: "Vi finner ikke noen møteinnkalling.",
  apiError:
    "Det skjedde en feil med henting av møteinnkallingen din. Vennligst prøv igjen senere.",
};

const Moteinnkalling = (): ReactElement => {
  const dialogmoteDataSM = useDialogmoteDataSM();

  if (dialogmoteDataSM.isError) {
    return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
  }

  if (dialogmoteDataSM.isSuccess) {
    const moteinnkalling = dialogmoteDataSM.data.moteinnkalling;

    if (moteinnkalling === undefined) {
      return (
        <ErrorWithEscapeRoute>{texts.noMeetingFound}</ErrorWithEscapeRoute>
      );
    }

    if (moteinnkalling.brevType === "AVLYST") {
      return <AvlystMoteinnkalling moteinnkalling={moteinnkalling} />;
    }

    return <PaagaaendeMoteinnkalling moteinnkalling={moteinnkalling} />;
  }
  return <AppSpinner />;
};

export default Moteinnkalling;
