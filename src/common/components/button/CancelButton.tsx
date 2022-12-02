import NextLink from "next/link";
import React from "react";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { Button } from "@navikt/ds-react";

const texts = {
  avbryt: "Avbryt",
};

export const CancelButton = () => {
  const landingUrl = useLandingUrl();

  return (
    <NextLink href={landingUrl} passHref>
      <Button as="a" variant="tertiary" size="medium">
        {texts.avbryt}
      </Button>
    </NextLink>
  );
};
