import { useDialogmoteDataSM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { useSvarPaMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { commonTexts } from "@/common/constants/commonTexts";
import { MotebehovSvarRequest } from "types/shared/motebehov";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { KontaktOssPaaAndreMaater } from "@/common/components/veileder/KontaktOssPaaAndreMaater";
import { BodyLong } from "@navikt/ds-react";

export const texts = {
  title: "Meld behov for møte",
  behovForMote: "Jeg har behov for et møte med NAV",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). ",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataSM();
  const submitMutation = useSvarPaMotebehovSM("meld");

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    submitMutation.mutate(motebehovSvar);
  };

  return (
    <PageContainer header={false}>
      <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
        <BodyLong spacing>
          I dialogmøtet kan du, arbeidsgiveren og veilederen din i NAV sammen
          finne muligheter som kan bidra til at du får en best mulig
          arbeidshverdag ut fra din helsesituasjon. Målet er å lage en plan for
          å komme tilbake i jobb. Hvis det er behov, kan behandleren din også
          delta.
        </BodyLong>
        <KontaktOssPaaAndreMaater />
        <MeldBehovContent
          motebehovTekst={texts.behovForMote}
          behandlerVaereMedTekst={texts.behandlerVaereMedTekst}
          sensitivInfoTekst={commonTexts.noSensitiveInfo}
          meldMotebehov={submitSvar}
        />
      </DialogmotePage>
    </PageContainer>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default MeldBehov;
