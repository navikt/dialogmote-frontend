import { Events } from "@/common/amplitude/events";
import React from "react";
import styled from "styled-components";
import { Button } from "@navikt/ds-react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { MotebehovSkjemaType } from "types/shared/motebehov";
import NextLink from "next/link";
import { useLandingUrl } from "@/common/hooks/routeHooks";

const texts = {
  button: "Meld behov for møte",
};

const ButtonWrapperStyled = styled.div`
  width: fit-content;
`;

interface Props {
  skjemaType: MotebehovSkjemaType;
}

export const MotebehovSubmitButton = ({ skjemaType }: Props) => {
  const landingUrl = useLandingUrl();
  const { trackEvent } = useAmplitude();

  const path =
    skjemaType === "MELD_BEHOV"
      ? `${landingUrl}/motebehov/meld`
      : `${landingUrl}/motebehov/svar`;

  return (
    <ButtonWrapperStyled>
      <NextLink href={path} passHref>
        <Button
          as="a"
          variant="primary"
          size="medium"
          onClick={() => {
            trackEvent(
              skjemaType === "MELD_BEHOV" ? Events.MeldBehov : Events.SvarBehov
            );
          }}
        >
          {texts.button}
        </Button>
      </NextLink>
    </ButtonWrapperStyled>
  );
};
