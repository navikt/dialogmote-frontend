import { ReactNode } from "react";
import styled from "styled-components";

const Circle = styled.span`
  height: 3rem;
  width: 3rem;
  background-color: #d8f9ff;
  border-radius: 50%;
  font-size: 1.5rem;
  text-align: center;
  vertical-align: middle;
  padding: 0.7rem;
  display: inline-flex;
`;

interface Props {
  icon: ReactNode;
}

const CircledIcon = ({ icon }: Props) => {
  return <Circle>{icon}</Circle>;
};

export default CircledIcon;
