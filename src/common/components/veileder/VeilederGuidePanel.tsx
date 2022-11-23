import { GuidePanel } from "@navikt/ds-react";
import { ReactNode } from "react";
import styled from "styled-components";

const GuidePanelStyled = styled(GuidePanel)`
  margin-bottom: 2rem;
`;
interface Props {
  children?: ReactNode;
}

const VeilederGuidePanel = ({ children }: Props) => {
  return <GuidePanelStyled>{children}</GuidePanelStyled>;
};

export default VeilederGuidePanel;
