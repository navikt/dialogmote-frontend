import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import React, { ReactNode } from "react";
import PageHeader from "@/common/components/header/PageHeader";
import Head from "next/head";
import AppSpinner from "@/common/components/spinner/AppSpinner";

interface Props {
  title: string;
  hideHeader?: boolean;
  isLoading: boolean;
  children: ReactNode;
}

export const DialogmotePage = ({
  title,
  hideHeader,
  isLoading,
  children,
}: Props) => {
  const renderContent = () => {
    if (isLoading) {
      return <AppSpinner />;
    }

    return (
      <>
        {!hideHeader && <PageHeader title={title} />}
        {children}
        <PersonvernInfo />
      </>
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
