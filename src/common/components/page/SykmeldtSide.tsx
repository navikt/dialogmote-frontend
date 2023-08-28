import React, { ReactNode } from "react";
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
        <PageHeading title={title} hideHeader={hideHeader} />

        {children}

        <PersonvernInfo />
      </div>
    </div>
  );
};
