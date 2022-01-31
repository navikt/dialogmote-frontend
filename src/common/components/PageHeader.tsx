import { Heading } from "@navikt/ds-react";

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  return (
    <Heading spacing size="2xlarge" level="1">
      {title}
    </Heading>
  );
};

export default PageHeader;
