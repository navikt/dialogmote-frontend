import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import { Button } from "@navikt/ds-react";
import { useLandingUrl } from "@/common/hooks/routeHooks";

const texts = {
  sendSvar: "Send svar",
  avbryt: "Avbryt",
};

const ButtonGroup = styled.div`
  display: inline-flex;
  padding-top: 1rem;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  width: 8rem;
`;

interface Props {
  onSubmit(): void;
}

export const MotebehovButtonRow = ({ onSubmit }: Props) => {
  const landingUrl = useLandingUrl();

  return (
    <ButtonGroup>
      <StyledButton onClick={onSubmit} variant="primary" size="medium">
        {texts.sendSvar}
      </StyledButton>
      <NextLink href={landingUrl}>
        <StyledButton variant="tertiary" size="medium">
          {texts.avbryt}
        </StyledButton>
      </NextLink>
    </ButtonGroup>
  );
};
