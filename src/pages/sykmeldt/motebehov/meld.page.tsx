import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { commonTexts } from "@/common/constants/commonTexts";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

export const texts = {
  title: "Meld behov for møte",
  behovForMote: "Jeg har behov for et møte med NAV",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). ",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();
  const { mutate, isLoading } = useSvarPaMotebehovSM("meld");

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    mutate(motebehovSvar);
  };

  return (
    <PageContainer header={false}>
      <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
        <MeldBehovContent
          motebehovTekst={texts.behovForMote}
          behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
          sensitivInfoTekst={commonTexts.noSensitiveInfo}
          meldMotebehov={submitSvar}
          isLoading={isLoading}
        />
      </DialogmotePage>
    </PageContainer>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
