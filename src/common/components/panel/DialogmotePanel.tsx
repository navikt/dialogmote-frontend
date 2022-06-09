import CircledIcon from "@/common/components/icon/CircledIcon";
import { Heading, Panel } from "@navikt/ds-react";
import { HeadingProps } from "@navikt/ds-react/esm/typography/Heading";
import React, { ReactNode } from "react";
import styled from "styled-components";

const PanelStyled = styled(Panel)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderStyled = styled(Heading)`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface Props {
  title?: string;
  icon?: ReactNode;
  className?: string;
  titleSize?: HeadingProps["size"];
  children: ReactNode;
}

const DialogmotePanel = ({
  title,
  icon,
  className,
  titleSize = "medium",
  children,
}: Props) => {
  return (
    <PanelStyled className={className}>
      {(title || icon) && (
        <HeaderStyled size={titleSize} level="2">
          {icon && <CircledIcon icon={icon} />}
          {title}
        </HeaderStyled>
      )}
      {children}
    </PanelStyled>
  );
};

export default DialogmotePanel;
