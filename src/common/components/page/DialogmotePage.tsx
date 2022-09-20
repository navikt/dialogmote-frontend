import React, { ReactNode } from "react";
import Head from "next/head";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import PageHeader from "@/common/components/header/PageHeader";
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
  if (isLoading) {
    return <AppSpinner />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {!hideHeader && <PageHeader title={title} />}
      {children}
      <PersonvernInfo />
    </>
  );
};
