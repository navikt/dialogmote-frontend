import NextLink from "next/link";
import React from "react";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import styled from "styled-components";
import { Button } from "@navikt/ds-react";

const texts = {
  avbryt: "Avbryt",
};

const StyledButton = styled(Button)`
  width: 8rem;
`;

export const CancelButton = () => {
  const landingUrl = useLandingUrl();

  return (
    <NextLink href={landingUrl}>
      <StyledButton variant="tertiary" size="medium">
        {texts.avbryt}
      </StyledButton>
    </NextLink>
  );
};
