import { Heading } from "@navikt/ds-react";
import Head from "next/head";

interface Props {
  title: string;
  hideHeader?: boolean;
}

export const PageHeading = ({ title, hideHeader }: Props) => {
  return (
    <>
      <Head>
        <title>
          {title + (title.length > 0 ? " - www.nav.no" : "www.nav.no")}
        </title>
      </Head>

      {!hideHeader ? (
        <Heading spacing={true} size={"large"} level={"1"}>
          {title}
        </Heading>
      ) : null}
    </>
  );
};
