import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "styled-components";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import PageHeader from "@/common/components/header/PageHeader";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../types/shared/sykmeldt";

const InnerContentWrapperStyled = styled.div`
  margin: 0 auto;
  max-width: 40rem;
`;

export const DialogmotePage = ({
  title,
  hideHeader,
  sideMenu,
  isLoading,
  children,
}: Props) => {
  const renderContent = () => {
    if (isLoading) {
      return <AppSpinner />;
    }

    return (
      <PageContainer
        navigation={sideMenu?.navigation}
        sykmeldt={{
          navn: sideMenu?.sykmeldt?.navn ?? "",
          fnr: sideMenu?.sykmeldt?.fnr ?? "",
        }}
      >
        <InnerContentWrapperStyled>
          {!hideHeader && <PageHeader title={title} />}
          {children}
          <PersonvernInfo />
        </InnerContentWrapperStyled>
      </PageContainer>
    );
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {renderContent()}
    </>
  );
};

interface Props {
  title: string;
  hideHeader?: boolean;
  sideMenu?: SideMenuProps;
  isLoading: boolean;
  children: ReactNode;
}

interface SideMenuProps {
  navigation?: React.ReactNode;
  sykmeldt?: Sykmeldt;
}
