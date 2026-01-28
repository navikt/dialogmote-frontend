import type { ReactNode } from "react";
import styles from "./circledicon.module.css";

interface Props {
  icon: ReactNode;
}

const CircledIcon = ({ icon }: Props) => {
  return (
    <span className={styles.circle} aria-hidden>
      {icon}
    </span>
  );
};

export default CircledIcon;
