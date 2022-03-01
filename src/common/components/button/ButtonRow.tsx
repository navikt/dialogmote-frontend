import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

const ButtonGroup = styled.div`
  display: inline-flex;
  padding-top: 1rem;
  gap: 1rem;
`;

export const ButtonRow = ({ children }: Props) => {
  return <ButtonGroup>{children}</ButtonGroup>;
};
