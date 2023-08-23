import React, { ReactElement, ReactNode } from "react";
import { PersonIcon } from "@navikt/aksel-icons";
import { Sykmeldt } from "../../../types/shared/sykmeldt";
import { addSpaceAfterEverySixthCharacter } from "@/common/utils/stringUtils";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { ArbeidsgiverSideMenu } from "@/common/components/menu/ArbeidsgiverSideMenu";
import { PageHeading } from "@/common/components/header/PageHeading";

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

  return (
    <PageContainer
      sykmeldt={getSykmeldtNameAndFnr(dialogmoteData.data?.sykmeldt)}
      header={getSykmeldtHeader(dialogmoteData.data?.sykmeldt)}
      navigation={
        <ArbeidsgiverSideMenu sykmeldt={dialogmoteData.data?.sykmeldt} />
      }
    >
      <>
        <PageHeading title={title} hideHeader={hideHeader} />
        {children}
      </>
    </PageContainer>
  );
};

export default ArbeidsgiverSide;
