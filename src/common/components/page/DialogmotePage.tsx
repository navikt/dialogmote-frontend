import React from "react";
import Head from "next/head";
import { People } from "@navikt/ds-icons";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import PageTitle from "@/common/components/header/PageTitle";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../types/shared/sykmeldt";
import { ArbeidsgiverSideMenu } from "@/common/components/menu/ArbeidsgiverSideMenu";
import { addSpaceAfterEverySixthCharacter } from "@/common/utils/stringUtils";

type WithNavigationAndHeader =
  | {
      sykmeldt: Sykmeldt | undefined;
      withAGNavigation?: boolean;
      withAGHeader?: boolean;
    }
  | {
      sykmeldt?: never;
      withAGNavigation?: never;
      withAGHeader?: never;
    };

type Props = {
  title: string;
  isLoading: boolean;
  children: React.ReactNode;
  hideTitle?: boolean;
} & WithNavigationAndHeader;

export const DialogmotePage = ({
  title,
  isLoading,
  children,
  hideTitle,
  withAGNavigation,
  withAGHeader,
  sykmeldt,
}: Props) => {
  const renderContent = () => {
    const sykmeldtName = sykmeldt?.navn ?? "";
    const sykmeldtFnr = sykmeldt?.fnr ?? "";

    const hasSykmeldtValidData =
      !!sykmeldtName && !!sykmeldtFnr && !!sykmeldt?.narmestelederId;
    const showAGHeader = withAGHeader && hasSykmeldtValidData;
    const showAGNavigation = withAGNavigation && hasSykmeldtValidData;

    const sykmeldtNameAndFnr = hasSykmeldtValidData
      ? { navn: sykmeldtName, fnr: sykmeldtFnr }
      : null;

    const agHeader = showAGHeader
      ? {
          title: sykmeldtName,
          Icon: People,
          subtitle: `Fødselsnr: ${addSpaceAfterEverySixthCharacter(
            sykmeldtFnr
          )}`,
        }
      : false;

    const agNavigation = showAGNavigation && (
      <ArbeidsgiverSideMenu sykmeldt={sykmeldt} />
    );

    return (
      <PageContainer
        header={agHeader}
        sykmeldt={sykmeldtNameAndFnr}
        navigation={agNavigation}
      >
        {!hideTitle && <PageTitle title={title} />}
        {children}
        <PersonvernInfo />
      </PageContainer>
    );
  };

  if (isLoading) {
    return (
      <PageContainer header={false}>
        <AppSpinner />
      </PageContainer>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {renderContent()}
    </>
  );
};
