import type { ReactNode } from "react";
import { PageHeading } from "@/common/components/header/PageHeading";
import PersonvernInfo from "@/common/components/personvern/PersonvernInfo";
import styles from "./SykmeldtSide.module.css";

interface Props {
  title: string;
  hideHeader?: boolean;
  hidePersonvern?: boolean;
  children: ReactNode;
}

export const SykmeldtSide = ({
  title,
  hideHeader,
  hidePersonvern,
  children,
}: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.innercontent}>
        <PageHeading title={title} hideHeader={hideHeader} />

        {children}

        {!hidePersonvern && <PersonvernInfo />}
      </div>
    </div>
  );
};
