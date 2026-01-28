import { BodyLong, GuidePanel, LocalAlert } from "@navikt/ds-react";
import { useEffect } from "react";
import { useFerdigstillMotebehovSM } from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import { SykmeldtSide } from "@/common/components/page/SykmeldtSide";

interface Props {
  title: string;
}

export const KanIkkeSvarePaaSvarBehov = ({ title }: Props) => {
  const ferdigstillSvarBehov = useFerdigstillMotebehovSM();

  // biome-ignore lint/correctness/useExhaustiveDependencies: should only run once on mount
  useEffect(() => {
    ferdigstillSvarBehov.mutate();
  }, []);

  return (
    <SykmeldtSide title={title} hideHeader={true} hidePersonvern={true}>
      <GuidePanel className="mb-6" poster={true}>
        <BodyLong>
          Du har mottatt et varsel du ikke skal ha. Du skal derfor ikke svare på
          om du har behov for dialogmøte.
        </BodyLong>
      </GuidePanel>

      <LocalAlert status="announcement">
        <LocalAlert.Content>
          Dersom du mener det har skjedd noe feil, kan du enten ta kontakt med
          Nav på telefon 55 55 33 33, eller{" "}
          <KontaktOssLink linkText=" sende oss en skriftlig forespørsel." />
        </LocalAlert.Content>
      </LocalAlert>
    </SykmeldtSide>
  );
};
