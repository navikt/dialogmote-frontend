import { Heading } from "@navikt/ds-react";
import styled from "styled-components";

interface Props {
  title: string;
}

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PageHeader = ({ title }: Props) => {
  return (
    <StyledHeading size="xlarge" level="1">
      {title}
    </StyledHeading>
  );
};

export default PageHeader;
