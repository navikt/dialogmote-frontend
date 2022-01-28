import styled from "styled-components";

const HeaderStyled = styled.h1`
  text-align: center;
  margin: 2rem;
`;

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  return (
    <HeaderStyled className="navds-heading navds-heading--2xlarge">
      {title}
    </HeaderStyled>
  );
};

export default PageHeader;
