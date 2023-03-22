import { Events } from "@/common/amplitude/events";
import React from "react";
import { LinkPanel } from "@navikt/ds-react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { MotebehovSkjemaType } from "types/shared/motebehov";
import NextLink from "next/link";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import styled from "styled-components";

const ContainedLinkPanel = styled(LinkPanel)`
  width: fit-content;
  margin-bottom: 1rem;
`;

interface Props {
  skjemaType: MotebehovSkjemaType;
  children: string;
}

export const MotebehovSubmitButton = ({ skjemaType, children }: Props) => {
  const landingUrl = useLandingUrl();
  const { trackEvent } = useAmplitude();

  const path =
    skjemaType === "MELD_BEHOV"
      ? `${landingUrl}/motebehov/meld`
      : `${landingUrl}/motebehov/svar`;

  return (
    <NextLink href={path} passHref>
      <ContainedLinkPanel
        border
        onClick={() => {
          trackEvent(
            skjemaType === "MELD_BEHOV" ? Events.MeldBehov : Events.SvarBehov
          );
        }}
      >
        <LinkPanel.Title>{children}</LinkPanel.Title>
      </ContainedLinkPanel>
    </NextLink>
  );
};
