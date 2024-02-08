import React, { ReactElement } from "react";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { commonTexts } from "@/common/constants/commonTexts";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

export const texts = {
  title: "Meld behov for møte",
  behovForMote: "Jeg har behov for et møte med NAV og arbeidsgiveren min.",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). ",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const { mutate, isLoading } = useSvarPaMotebehovSM();

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    mutate(motebehovSvar);
  };

  return (
    <SykmeldtSide title={texts.title}>
      <MeldBehovContent
        motebehovTekst={texts.behovForMote}
        behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
        sensitivInfoTekst={commonTexts.noSensitiveInfo}
        meldMotebehov={submitSvar}
        isSubmitting={isLoading}
      />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
