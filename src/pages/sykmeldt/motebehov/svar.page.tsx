import React, { ReactElement } from "react";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { commonTexts } from "@/common/constants/commonTexts";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

const texts = {
  title: "Meld behov for møte",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const { mutate, isLoading } = useSvarPaMotebehovSM();

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    mutate(motebehovSvar);
  };

  return (
    <DialogmotePage title={texts.title}>
      <SvarBehovContent
        svarMotebehov={submitSvar}
        begrunnelseDescription={commonTexts.noSensitiveInfo}
        isSubmitting={isLoading}
      />
    </DialogmotePage>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default SvarBehov;
