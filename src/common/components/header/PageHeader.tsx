import { Heading } from "@navikt/ds-react";

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  return (
    <div className="-mt-2 mb-8">
      <Heading size="xlarge" level="1">
        {title}
      </Heading>
    </div>
  );
};

export default PageHeader;
