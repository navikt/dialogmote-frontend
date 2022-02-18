import React, { ReactElement } from "react";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { ErrorWithEscapeRoute } from "@/common/components/error/ErrorWithEscapeRoute";
import { AvlystMoteinnkalling } from "@/common/components/moteinnkalling/AvlystMoteinnkalling";
import { PaagaaendeMoteinnkalling } from "@/common/components/moteinnkalling/PaagaaendeMoteinnkalling";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";

const texts = {
  noMeetingFound: "Vi finner ikke noen møteinnkalling.",
  apiError:
    "Det skjedde en feil med henting av møteinnkallingen din. Vennligst prøv igjen senere.",
};

const Moteinnkalling = (): ReactElement => {
  const dialogmoteDataAG = useDialogmoteDataAG();

  if (dialogmoteDataAG.isError) {
    return <ErrorWithEscapeRoute>{texts.apiError}</ErrorWithEscapeRoute>;
  }

  if (dialogmoteDataAG.isSuccess) {
    const moteinnkalling = dialogmoteDataAG.data.moteinnkalling;

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
