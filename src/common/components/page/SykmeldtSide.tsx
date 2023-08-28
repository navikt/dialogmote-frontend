import React, { ReactNode } from "react";
import Head from "next/head";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import styles from "./SykmeldtSide.module.css";
import { PageHeading } from "@/common/components/header/PageHeading";

interface Props {
  title: string;
  hideHeader?: boolean;
  children: ReactNode;
}

export const SykmeldtSide = ({ title, hideHeader, children }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.innercontent}>
        <Head>
          <title>{title}</title>
        </Head>

        {!hideHeader && <PageHeading title={title} />}

        {children}

        <PersonvernInfo />
      </div>
    </div>
  );
};
