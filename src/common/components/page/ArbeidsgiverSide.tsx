import { PersonIcon } from "@navikt/aksel-icons";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import type { ReactElement, ReactNode } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import IngenSykmeldingInfo from "@/common/components/arbeidsgiver/IngenSykmeldingInfo";
import { PageHeading } from "@/common/components/header/PageHeading";
import { ArbeidsgiverSideMenu } from "@/common/components/menu/ArbeidsgiverSideMenu";
import { HttpError } from "@/common/utils/errors/HttpError";
import { addSpaceAfterEverySixthCharacter } from "@/common/utils/stringUtils";
import type { Sykmeldt } from "../../../types/shared/sykmeldt";

const getSykmeldtHeader = (sykmeldt?: Sykmeldt) => {
  if (sykmeldt?.navn && sykmeldt.fnr) {
    return {
      title: sykmeldt.navn,
      subtitle: `Fødselsnr: ${addSpaceAfterEverySixthCharacter(sykmeldt?.fnr)}`,
      Icon: PersonIcon,
    };
  }

  return {
    title: "Den sykmeldte",
    subtitle: `Fødselsnr: `,
    Icon: PersonIcon,
  };
};

const getSykmeldtNameAndFnr = (sykmeldt?: Sykmeldt) => {
  if (!sykmeldt) return null;

  return {
    navn: sykmeldt.navn || "",
    fnr: sykmeldt.fnr,
  };
};

interface SideProps {
  title: string;
  hideHeader?: boolean;
  children: ReactNode;
}

const ArbeidsgiverSide = ({
  title,
  hideHeader,
  children,
}: SideProps): ReactElement => {
  const dialogmoteData = useDialogmoteDataAG();

  if (
    dialogmoteData.isError &&
    dialogmoteData.error instanceof HttpError &&
    dialogmoteData.error.code === 404
  ) {
    return <IngenSykmeldingInfo />;
  }

  return (
    <PageContainer
      sykmeldt={getSykmeldtNameAndFnr(dialogmoteData.data?.sykmeldt)}
      header={getSykmeldtHeader(dialogmoteData.data?.sykmeldt)}
      navigation={
        <ArbeidsgiverSideMenu sykmeldt={dialogmoteData.data?.sykmeldt} />
      }
    >
      <PageHeading title={title} hideHeader={hideHeader} />
      {children}
    </PageContainer>
  );
};

export default ArbeidsgiverSide;
