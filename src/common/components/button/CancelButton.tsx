import { Button } from "@navikt/ds-react";
import NextLink from "next/link";
import { useLandingUrl } from "@/common/hooks/routeHooks";

const texts = {
  avbryt: "Avbryt",
};
//fix
export const CancelButton = () => {
  const landingUrl = useLandingUrl();

  return (
    <NextLink href={landingUrl} passHref>
      <Button variant="tertiary" size="medium">
        {texts.avbryt}
      </Button>
    </NextLink>
  );
};
