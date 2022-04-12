import { Heading } from "@navikt/ds-react";
import styled from "styled-components";

interface Props {
  title: string;
}

const MarginStyled = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PageHeader = ({ title }: Props) => {
  return (
    <MarginStyled>
      <Heading size="xlarge" level="1">
        {title}
      </Heading>
    </MarginStyled>
  );
};

export default PageHeader;
