import React, { ReactElement } from "react";
import { SvarBehovContent } from "@/common/components/motebehov/SvarBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import { commonTexts } from "@/common/constants/commonTexts";
import {
  MotebehovSvarRequest,
  MotebehovSvarRequestAG,
} from "types/shared/motebehov";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import ArbeidsgiverSide from "@/common/components/wrappers/ArbeidsgiverSide";

const texts = {
  title: "Meld behov for møte",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const SvarBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const { mutate, isLoading } = useSvarPaMotebehovAG();

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    const svar: MotebehovSvarRequestAG = {
      virksomhetsnummer: dialogmoteData.data?.sykmeldt?.orgnummer || "",
      arbeidstakerFnr: dialogmoteData.data?.sykmeldt?.fnr || "",
      motebehovSvar: motebehovSvar,
    };
    mutate(svar);
  };

  return (
    <ArbeidsgiverSide title={texts.title}>
      <SvarBehovContent
        svarMotebehov={submitSvar}
        begrunnelseDescription={commonTexts.noSensitiveInfo}
        isSubmitting={isLoading}
      />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default SvarBehov;
