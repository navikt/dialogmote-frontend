import { GuidePanel } from "@navikt/ds-react";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const VeilederGuidePanel = ({ children }: Props) => {
  return <GuidePanel className="mb-8">{children}</GuidePanel>;
};

export default VeilederGuidePanel;
