import React, { ReactElement } from "react";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { MeldBehovContent } from "@/common/components/motebehov/MeldBehovContent";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { DialogmotePage } from "@/common/components/page/DialogmotePage";
import { useSvarPaMotebehovAG } from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import { commonTexts } from "@/common/constants/commonTexts";
import {
  MotebehovSvarRequest,
  MotebehovSvarRequestAG,
} from "types/shared/motebehov";
import { getAgSideMenuHeader } from "@/common/utils/arbeidsgiverSideMenu";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";

export const texts = {
  title: "Meld behov for møte",
  behovForMoteTekst: "Jeg har behov for et møte med NAV og ",
  behandlerVaereMedTekst:
    "Jeg ønsker at den som sykmelder arbeidstakeren, også skal delta i møtet (valgfri). ",
  begrunnelseLabel: "Begrunnelse (valgfri)",
  apiError: "Det oppsto en teknisk feil. Vennligst prøv igjen senere.",
};

const MeldBehov = (): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();
  const { mutate, isLoading } = useSvarPaMotebehovAG("meld");

  const ansattName = dialogmoteData.data?.sykmeldt?.navn || "den ansatte.";
  const motebehovTekst = `${texts.behovForMoteTekst} ${ansattName}`;

  const submitSvar = (motebehovSvar: MotebehovSvarRequest) => {
    const svar: MotebehovSvarRequestAG = {
      virksomhetsnummer: dialogmoteData.data?.sykmeldt?.orgnummer || "",
      arbeidstakerFnr: dialogmoteData.data?.sykmeldt?.fnr || "",
      motebehovSvar: motebehovSvar,
    };
    mutate(svar);
  };

  return (
    <PageContainer header={getAgSideMenuHeader(dialogmoteData.data)}>
      <DialogmotePage title={texts.title} isLoading={dialogmoteData.isLoading}>
        <MeldBehovContent
          motebehovTekst={motebehovTekst}
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