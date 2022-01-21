import CircledIcon from "@/common/components/icon/CircledIcon";
import { Heading } from "@navikt/ds-react";
import React, { ReactNode } from "react";
import styled from "styled-components";

const PanelStyled = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  background-color: white;
  border-radius: 0.25rem;
  margin-bottom: 2rem;
`;

const HeaderStyled = styled(Heading)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface Props {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const DialogmotePanel = ({ title, icon, className, children }: Props) => {
  return (
    <PanelStyled className={className}>
      <HeaderStyled size="medium" level="2">
        {icon && <CircledIcon icon={icon} />}
        {title}
      </HeaderStyled>
      {children}
    </PanelStyled>
  );
};

export default DialogmotePanel;
