import { Alert, BodyLong, GuidePanel } from "@navikt/ds-react";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";
import React, { useEffect } from "react";
import { useFerdigstillMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";

interface Props {
  title: string;
}

export const KanIkkeSvarePaaSvarBehov = ({ title }: Props) => {
  const ferdigstillSvarBehov = useFerdigstillMotebehovSM();

  useEffect(() => {
    ferdigstillSvarBehov.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SykmeldtSide title={title} hideHeader={true} hidePersonvern={true}>
      <GuidePanel className="mb-6" poster={true}>
        <BodyLong>
          Du har mottatt et varsel du ikke skal ha. Du skal derfor ikke svare på
          om du har behov for dialogmøte.
        </BodyLong>
      </GuidePanel>

      <Alert variant="info">
        Dersom du mener det har skjedd noe feil, kan du enten ta kontakt med Nav
        på telefon 55 55 33 33, eller{" "}
        <KontaktOssLink linkText=" sende oss en skriftlig forespørsel." />
      </Alert>
    </SykmeldtSide>
  );
};
