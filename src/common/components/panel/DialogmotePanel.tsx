import React, { ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Heading } from "@navikt/ds-react";

const PanelStyled = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  background-color: white;
  border-radius: 0.25rem;
`;

const HeaderStyled = styled(Heading)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

interface Props {
  title: string;
  icon?: string;
  className?: string;
  children: ReactNode;
}

const DialogmotePanel = ({ title, icon, className, children }: Props) => {
  return (
    <PanelStyled className={className}>
      {/*TODO: Ikoner må gjøres noe med*/}
      {icon && (
        <Image alt={title} src={icon} layout="fill" objectFit="contain" />
      )}
      <HeaderStyled size="medium" level="2">
        {title}
      </HeaderStyled>
      {children}
    </PanelStyled>
  );
};

export default DialogmotePanel;
